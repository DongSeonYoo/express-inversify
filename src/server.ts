import express from 'express';
import router from './routes';
import { errorHandlingMiddleWare } from './middlewares/error.middleware';
import { appDataSource } from './configs/typeorm.config';

const app = express();

appDataSource.initialize().then(() => {
    console.log('db connections');
});

export default app;