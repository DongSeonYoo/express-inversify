import { RequestHandler } from 'express';
import * as authService from '../services/auth.services';
import { SignupDTO } from '../dtos/auth/signup.dto';
// export const login = (req: Request, res: Response, next: NextFunction) => {
// 	try {

// 	} catch (error) {

// 	}
// };

// dto - valid 는 나중에 하고
// 회언가입먼저 해보자
export const signUp: RequestHandler = async (req, res, next) => {
    try {
        const signupDTO = SignupDTO.of(req.body);

        // 검증이 성공하면 서비스 호출
        res.send(await authService.signup(signupDTO));
    } catch (error) {
        // 검증에서 발생한 예외를 캐치하여 클라이언트에게 오류 응답 전송
        console.log(error);
        return next(error);
    }
};
