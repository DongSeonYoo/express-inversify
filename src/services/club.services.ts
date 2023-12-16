import { inject, injectable } from 'inversify';
import { ClubModule } from '../configs/inversify/types';
import { ClubRepository } from '../repositories/club.repository';

@injectable()
export class ClubService {
    constructor(
        @inject(ClubModule.ClubRepository) private readonly clubRepository: ClubRepository,
    ) {}
}
