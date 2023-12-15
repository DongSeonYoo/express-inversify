import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { UserModule } from '../configs/inversify/types';
import { UserService } from '../services/user.services';
import { Success } from '../utils/common/response.common';

@injectable()
export class UserController {
    constructor(@inject(UserModule.UserService) private readonly userService: UserService) {}

    async getProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { userIdx } = req.session.user!;

            const user = await this.userService.getProfile(userIdx);

            return res.send(new Success('', user));
        } catch (error) {
            return next(error);
        }
    }
}
