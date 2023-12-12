import { appDataSource } from '../configs/typeorm.config';
import { User } from '../entities/user.entity';

const userRepository = appDataSource.getRepository(User);

export const signUp = async (user: User): Promise<number> => {
    const result = await userRepository
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
            {
                email: user.email,
                pw: user.pw,
                name: user.name,
                major: user.major,
                personalColor: user.personalColor,
                entryYear: user.entryYear,
            },
        ])
        .returning(['id'])
        .execute();

    return result.raw[0].id;
};
