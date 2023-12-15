import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { env } from './env';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: env.postgres.host,
    port: env.postgres.port,
    username: env.postgres.user,
    password: env.postgres.password,
    database: env.postgres.database,
    synchronize: env.postgres.synchronize,
    entities: [__dirname + '/../entities/*'],
});
