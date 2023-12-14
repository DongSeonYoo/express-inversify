import { DataSource, Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { inject, injectable } from 'inversify';
import { AuthModule } from '../configs/inversify/types';

@injectable()
export class UserRepository {
    private readonly repository: Repository<User>;

    constructor(@inject(AuthModule.DataSource) private readonly dataSource: DataSource) {
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
}
