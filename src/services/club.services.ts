import { inject, injectable } from 'inversify';
import { ClubModule } from '../configs/inversify/types';
import { ClubRepository } from '../repositories/club.repository';
import { CreateClubDto } from '../dtos/club/create-club.dto';

@injectable()
export class ClubService {
    constructor(
        @inject(ClubModule.ClubRepository) private readonly clubRepository: ClubRepository,
    ) {}

    async createClub(userIdx: number, dto: CreateClubDto) {
        const club = dto.toEntity();

        const clubId = await this.clubRepository.createClub(userIdx, club);

        return clubId;
    }
}
