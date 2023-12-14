import { NextFunction, Response, Request } from 'express';
import { SignupRequestDTO } from '../dtos/auth/signup.dto';
import { LoginDto } from '../dtos/auth/login.dto';
import { inject, injectable } from 'inversify';
import { AuthService } from '../services/auth.services';
import { AuthModule } from '../configs/inversify/types';
import { validate } from '../utils/validate.util';
import { Success } from '../utils/common/response.common';

@injectable()
export class AuthController {
    constructor(
        @inject(AuthModule.AuthService)
        private readonly authService: AuthService,
    ) {}

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const signupDto = SignupRequestDTO.of(req.body);

            const result = await this.authService.signup(signupDto);

            res.send(new Success('회원가입 성공', result));
        } catch (error) {
            return next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginDto = LoginDto.of(req.body);

            const data = await this.authService.login(loginDto);

            res.send(new Success('로그인 성공', data));
        } catch (error) {
            return next(error);
        }
    }

    async checkDuplicateEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { email } = req.params;
            validate(email, 'email').checkInput();

            const data = await this.authService.checkDuplicateEmail(email);
            if (!data) {
                return res.send();
            }

            res.send(data);
        } catch (error) {
            return next(error);
        }
    }
}
