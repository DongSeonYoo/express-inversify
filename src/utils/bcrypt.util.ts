import bcrypt from 'bcrypt';

export const hashing = async (rawPassword: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(rawPassword, salt);
};

export const compare = async (rawPassword: string, hashedPassword: string) => {
    return bcrypt.compare(rawPassword, hashedPassword);
};
