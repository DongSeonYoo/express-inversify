import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { inject, injectable } from 'inversify';
import { Database } from '../configs/inversify/types';
import { UpdateUserDto } from '../dtos/user/user-update.dto';

@injectable()
export class UserRepository {
    private readonly repository: Repository<User>;

    constructor(@inject(Database.DataSource) private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(User);
    }

    async findUserByIdx(userIdx: number) {
        return this.repository.findOne({
            where: {
                id: userIdx,
            },
        });
    }

    async findUserByEmail(email: string) {
        return await this.repository.findOne({
            where: {
                email,
            },
        });
    }

    async signUp(user: User): Promise<number> {
        const result = await this.repository
            .createQueryBuilder()
            .insert()
            .into(User)
            .values([
                {
                    email: user.email,
                    password: user.password,
                    name: user.name,
                    major: user.major,
                    personalColor: user.personalColor,
                    entryYear: user.entryYear,
                },
            ])
            .execute();

        return result.raw[0].id;
    }

    async getUserProfileByIdx(userIdx: number) {
        const profile = await this.repository
            .createQueryBuilder('user')
            .select([
                'user.name AS "name"',
                'user.entryYear AS "entryYear"',
                'user.personalColor AS "personalColor"',
                'to_char(user.createdAt, \'YYYY.MM.DD\') AS "createdAt"',
                'major.name AS "major"',
            ])
            .leftJoin('user.major', 'major')
            .where('user.id = :userIdx', { userIdx })
            .getRawOne();

        return profile;
    }

    async updateUser(userIdx: number, dto: UpdateUserDto) {
        const updateResult = await this.repository
            .createQueryBuilder('user')
            .update()
            .set({ name: dto.name, entryYear: dto.entryYear, major: dto.major })
            .where('id = :userIdx', { userIdx })
            .returning('id')
            .execute();

        return updateResult.raw[0].id;
    }

    async deleteUser(userIdx: number) {
        return this.repository.softDelete({
            id: userIdx,
        });
    }
}
