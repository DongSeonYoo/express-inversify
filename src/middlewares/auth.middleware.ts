import { RequestHandler } from 'express';
import { UnauthorizedException } from '../utils/customError.util';

export const checkAuth: RequestHandler = (req, res, next) => {
    try {
        if (req.session && req.session.user) {
            return next();
        }
    } catch (error) {
        return next(error);
    }
    throw new UnauthorizedException('로그인 필요함미다');
};
