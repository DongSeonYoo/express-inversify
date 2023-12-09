import { Pool } from 'pg';
import { ENV } from './env';

const pool = new Pool({
    user: ENV.DATABASE.USER,
    host: ENV.DATABASE.HOST,
    database: ENV.DATABASE.DATABASE,
    password: ENV.DATABASE.PASSWORD,
    port: ENV.DATABASE.PORT,
    max: ENV.DATABASE.MAX_CONNECTION,
});

export default pool;
