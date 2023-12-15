import dotenv from 'dotenv';

dotenv.config();

export const env = {
    port: process.env.PORT,
    session_secret_key: process.env.SESSION_SECRET_KEY,

    postgres: {
        user: process.env.POSTGRESQL_USER,
        host: process.env.POSTGRESQL_HOST,
        database: process.env.POSTGRESQL_DATABASE,
        synchronize: true,
        password: process.env.POSTGRESQL_PASSWORD,
        port: Number(process.env.POSTGRESQL_PORT) || 5432,
        max_connection: Number(process.env.POSTGRESQL_MAX_CONNECTION),
    },

    redis: {
        url: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
    },
};
