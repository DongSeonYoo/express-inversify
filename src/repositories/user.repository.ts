import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { inject, injectable } from 'inversify';
import { Database } from '../configs/inversify/types';

@injectable()
export class UserRepository {
    private readonly repository: Repository<User>;

    constructor(@inject(Database.DataSource) private readonly dataSource: DataSource) {
        this.repository = dataSource.getRepository(User);
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

    async findUserByEmail(email: string) {
        return await this.repository.findOne({
            where: {
                email,
            },
        });
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
}
