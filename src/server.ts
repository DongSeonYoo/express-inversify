import 'reflect-metadata';

import express from 'express';
import router from './routes';
import session from 'express-session';
import IORedis from 'ioredis';
import RedisStore from 'connect-redis';
import cookieParser from 'cookie-parser';
import { errorHandlingMiddleWare } from './middlewares/error.middleware';
import { appDataSource } from './configs/typeorm.config';
import { env } from './configs/env';

const app = express();

appDataSource.initialize().then(() => {
    console.log('db connections');
});

const redisClient = new IORedis(env.redis.url);
const redisStore = new RedisStore({ client: redisClient });

app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret: env.session_secret_key!,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: false,
            maxAge: 3600000, // 세션 만료 시간 (1시간)
        },
        store: redisStore,
    }),
);

app.use('/', router);

app.use(errorHandlingMiddleWare);

export default app;
