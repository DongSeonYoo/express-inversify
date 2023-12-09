import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT,

    DATABASE: {
        USER: process.env.POSTGRESQL_USER,
        HOST: process.env.POSTGRESQL_HOST,
        DATABASE: process.env.POSTGRESQL_DATABASE,
        PASSWORD: process.env.POSTGRESQL_PASSWORD,
        PORT: Number(process.env.POSTGRESQL_PORT) || 5432,
        MAX_CONNECTION: Number(process.env.POSTGRESQL_MAX_CONNECTION),
    },
};
