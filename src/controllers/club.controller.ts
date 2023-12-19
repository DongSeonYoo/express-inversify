import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { ClubModule } from '../configs/inversify/types';
import { ClubService } from '../services/club.services';
import { CreateClubDto } from '../dtos/club/create-club.dto';
import { Success } from '../utils/common/response.common';
import { validate } from '../utils/validate.util';

@injectable()
export class ClubController {
    constructor(@inject(ClubModule.ClubService) private readonly clubService: ClubService) {}

    async createClub(req: Request, res: Response, next: NextFunction) {
        try {
            const { userIdx } = req.session.user!;

            const dto = CreateClubDto.of(req.body);

            const result = await this.clubService.createClub(userIdx, dto);

            res.send(new Success('동아리 생성 성공', result));
        } catch (error) {
            return next(error);
        }
    }

    async getClubProfile(req: Request, res: Response, next: NextFunction) {
        try {
            const clubIdx = req.params.clubIdx;

            validate(clubIdx, 'clubIdx').checkInput().isNumber();

            const clubInfo = await this.clubService.getClub(clubIdx);

            res.send(new Success('', clubInfo));
        } catch (error) {
            return next(error);
        }
    }

    selectAllClub(req: Request, res: Response, next: NextFunction) {
        try {
            this.clubService.selectAllClub();
        } catch (error) {
            return next(error);
        }
    }
}
