import { inject, injectable } from 'inversify';
import { ClubModule } from '../configs/inversify/types';
import { ClubRepository } from '../repositories/club.repository';
import { CreateClubDto } from '../dtos/club/create-club.dto';
import { NotFoundException } from '../utils/customError.util';

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

    async getClub(clubIdx: string) {
        const clubInfo = await this.clubRepository.getClubByIdx(clubIdx);
        if (!clubInfo) {
            throw new NotFoundException('해당하는 동아리가 존재하지 않습니다');
        }

        return clubInfo;
    }

    async selectAllClub() {}
}
