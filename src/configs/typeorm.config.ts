import 'reflect-metadata';

import { DataSource } from 'typeorm';
import { ENV } from './env';

export const appDataSource = new DataSource({
    type: 'postgres',
    host: ENV.database.host,
    port: ENV.database.port,
    username: ENV.database.user,
    password: ENV.database.password,
    database: ENV.database.database,
    synchronize: ENV.database.synchronize,
    entities: [__dirname + '/../entities/*'],
});
