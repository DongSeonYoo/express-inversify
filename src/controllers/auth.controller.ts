import { RequestHandler } from 'express';
import * as authService from '../services/auth.services';
import { SignupRequestDTO } from '../dtos/auth/signup/signup-req.dto';
import { LoginRequestDto } from '../dtos/auth/login/login-req.dto';

export const signUp: RequestHandler = async (req, res, next) => {
    try {
        const signupDto = SignupRequestDTO.of(req.body);

        const data = await authService.signup(signupDto);
        res.send(data);
    } catch (error) {
        return next(error);
    }
};

export const login: RequestHandler = async (req, res, next) => {
    try {
        const loginDto = LoginRequestDto.of(req.body);

        const data = await authService.login(loginDto);
        res.send(data);
    } catch (error) {
        return next(error);
    }
};
