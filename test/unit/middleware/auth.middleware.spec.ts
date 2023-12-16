import { Request, Response } from 'express';
import { checkAuth } from '../../../src/middlewares/auth.middleware';
import { UnauthorizedException } from '../../../src/utils/customError.util';

describe('auth check middleware에 대해 테스트한다', () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let next = jest.fn();

    it('로그인이 되어있으면 next를 호출한다', () => {
        // given
        req = {
            session: {
                user: {
                    email: 'test123@naver.com',
                    userIdx: 1,
                },
            },
        } as Partial<Request>;

        // when
        checkAuth(req as Request, res as Response, next);

        // then
        expect(next).toHaveBeenCalledWith();
    });

    it('로그인되어있지 않으면 401 Error를 던진다', () => {
        // given
        req.session = undefined;

        // when
        const func = () => {
            checkAuth(req as Request, res as Response, next);
        };

        // then
        expect(func).toThrow(UnauthorizedException);
    });
});
