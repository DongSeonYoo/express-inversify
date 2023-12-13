import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { inject, injectable } from 'inversify';
import TYPES from '../inversify/types';

@injectable()
export class UserRepository {
    private readonly repository: Repository<User>;

    constructor(
        @inject(TYPES.DataSource) private readonly dataSource: DataSource,
    ) {
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
            .returning(['id'])
            .execute();

        return result.raw[0].id;
    }

    findUserByEmail = async (email: string) => {
        return await this.repository.findOne({
            select: {
                id: true,
                password: true,
            },
            where: {
                email,
            },
        });
    };
}
