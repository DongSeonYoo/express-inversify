import { inject, injectable } from 'inversify';
import { Database } from '../configs/inversify/types';
import { DataSource, Repository } from 'typeorm';
import { Club } from '../entities/club.entity';
import { Belong } from '../entities/belong.entity';
import { BigCategory } from '../entities/big-category.entity';
import { SmallCategory } from '../entities/small-category.entity';

@injectable()
export class ClubRepository {
    private readonly repository: Repository<Club>;
    constructor(@inject(Database.DataSource) private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(Club);
    }

    async createClub(userIdx: number, club: Club) {
        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            // 동아리 생성
            const createdClub = await queryRunner.manager.save(Club, club);

            // 동아리 멤버 테이블에 삽입
            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into('club_member_tb')
                .values({
                    user: { id: userIdx },
                    club: { id: createdClub.id },
                    position: 0,
                })
                .execute();

            await queryRunner.commitTransaction();

            return createdClub.id;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        } finally {
            await queryRunner.release();
        }
    }

    async getClubByIdx(clubIdx: string) {
        return this.repository
            .createQueryBuilder('club')
            .select([
                'club.name as "name"',
                'belong.name as "belong"',
                'bigCategory.name as "bigCategory"',
                'smallCategory.name as "smallCategory"',
                'club.profileImg as "profileImg"',
                'club.bannerImg as "bannerImg"',
                'club.cover as "cover"',
                'club.themeColor as "themeColor"',
            ])
            .innerJoin('club.belong', 'belong')
            .innerJoin('club.bigCategory', 'bigCategory')
            .innerJoin('club.smallCategory', 'smallCategory')
            .where('club.id = :clubIdx', { clubIdx })
            .getRawOne();
    }
}
