import { inject, injectable } from 'inversify';
import { Request, Response, NextFunction } from 'express';
import { UserModule } from '../configs/inversify/types';
import { UserService } from '../services/user.services';
import { Success } from '../utils/common/response.common';
import { UpdateUserDto } from '../dtos/user/user-update.dto';

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

    async modifyProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const { userIdx } = req.session.user!;
            const dto = UpdateUserDto.of(req.body);

            const result = await this.userService.modifyProfile(userIdx, dto);

            return res.send(new Success('수정 성공', result));
        } catch (error) {
            return next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const { userIdx } = req.session.user!;

            const result = await this.userService.deleteUser(userIdx);

            return res.send(new Success('삭제 성공'));
        } catch (error) {
            return next(error);
        }
    }
}
