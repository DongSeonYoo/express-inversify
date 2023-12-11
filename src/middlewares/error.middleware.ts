import { ErrorRequestHandler } from 'express';

export const errorHandlingMiddleWare: ErrorRequestHandler = (
    error,
    req,
    res,
    next,
) => {
    console.log('error: ' + error);
    res.status(error.statusCode).send(error.message + 'qwerrqwerqwerqwerq');
};
