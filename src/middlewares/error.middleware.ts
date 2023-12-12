import { ErrorRequestHandler } from 'express';
import { CustomError } from '../utils/customError.util';
import { ICommonResponse } from '../common/response.common';

export const errorHandlingMiddleWare: ErrorRequestHandler = (
    error: CustomError,
    req,
    res,
    next,
) => {
    console.error(error);
    if (!error.statusCode) {
        const serverError: ICommonResponse = {
            message: '서버에서 오류가 발생했습니다',
            statusCode: 500,
            data: null,
        };

        return res.status(serverError.statusCode).send(serverError);
    }

    res.status(error.statusCode).send(error);
};
