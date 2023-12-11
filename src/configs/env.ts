import dotenv from 'dotenv';

dotenv.config();

export const ENV = {
    PORT: process.env.PORT,

    database: {
        user: process.env.POSTGRESQL_USER,
        host: process.env.POSTGRESQL_HOST,
        database: process.env.POSTGRESQL_DATABASE,
        synchronize: true,
        password: process.env.POSTGRESQL_PASSWORD,
        port: Number(process.env.POSTGRESQL_PORT) || 5432,
        max_connection: Number(process.env.POSTGRESQL_MAX_CONNECTION),
    },
};
