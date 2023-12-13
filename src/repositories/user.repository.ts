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
};

export const findUserByEmail = async (email: string) => {
    return await userRepository.findOne({
        select: {
            id: true,
            password: true,
        },
        where: {
            email,
        },
    });
};
