import { NextFunction, Response, Request } from 'express';
import { SignupRequestDTO } from '../dtos/auth/signup/signup-req.dto';
import { LoginRequestDto } from '../dtos/auth/login/login-req.dto';
import { inject, injectable } from 'inversify';
import { AuthService } from '../services/auth.services';
import TYPES from '../inversify/types';

@injectable()
export class AuthController {
    constructor(
        @inject(TYPES.AuthService) private readonly authService: AuthService,
    ) {}

    async signUp(req: Request, res: Response, next: NextFunction) {
        try {
            const signupDto = SignupRequestDTO.of(req.body);

            const data = await this.authService.signup(signupDto);

            res.send(data);
        } catch (error) {
            return next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginDto = LoginRequestDto.of(req.body);

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
