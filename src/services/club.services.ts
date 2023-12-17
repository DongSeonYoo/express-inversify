import { inject, injectable } from 'inversify';
import { ClubModule } from '../configs/inversify/types';
import { ClubRepository } from '../repositories/club.repository';
import { CreateClubDto } from '../dtos/club/create-club.dto';

@injectable()
export class ClubService {
    constructor(
        @inject(ClubModule.ClubRepository) private readonly clubRepository: ClubRepository,
    ) {}

    /**
     *
     * @param userIdx 생성할 사용자 인덱스
     * @param dto 생성할 동아리 정보
     * @returns 생성된 동아리 인덱스
     */
    async createClub(userIdx: number, dto: CreateClubDto) {
        const club = dto.toEntity();

        const clubIdx = await this.clubRepository.createClub(userIdx, club);

        return clubIdx;
    }
}
