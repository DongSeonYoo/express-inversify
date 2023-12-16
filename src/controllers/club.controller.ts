import { inject, injectable } from 'inversify';
import { ClubModule } from '../configs/inversify/types';
import { ClubService } from '../services/club.services';

@injectable()
export class ClubController {
    constructor(@inject(ClubModule.ClubService) private readonly clubService: ClubService) {}

    createClub() {}
}
