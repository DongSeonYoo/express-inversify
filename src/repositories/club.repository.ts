import { inject, injectable } from 'inversify';
import { ClubModule, Database } from '../configs/inversify/types';
import { Compressor, DataSource, Repository } from 'typeorm';
import { Club } from '../entities/club.entity';
import { ClubMember } from '../entities/club-member.entity';

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
            console.log(createdClub.id);
            console.log(userIdx);

            // 동아리 멤버 테이블에 삽입
            await queryRunner.manager
                .createQueryBuilder()
                .insert()
                .into('club_member_tb')
                .values({ user: { id: userIdx }, club: { id: createdClub.id }, position: 0 })
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
}
