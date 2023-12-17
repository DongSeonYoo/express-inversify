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
        return this.repository
            .createQueryBuilder('user')
            .select(['id', 'password'])
            .where('user.email')
            .where('user.email = :email', { email })
            .getRawOne();
    }

    async duplicateCheckEmail(email: string) {
        return this.repository
            .createQueryBuilder('user')
            .select(['user.id as id'])
            .where('user.email')
            .where('user.email = :email', { email })
            .withDeleted()
            .getRawOne();
    }

    async signUp(user: User) {
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
            .returning('id')
            .execute();
        return result.raw[0].id;
    }

    async getUserProfileByIdx(userIdx: number) {
        return this.repository
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
