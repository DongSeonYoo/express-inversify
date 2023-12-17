import { inject, injectable } from 'inversify';
import { UserModule } from '../configs/inversify/types';
import { UserRepository } from '../repositories/user.repository';
import { BadRequestException } from '../utils/customError.util';
import { UpdateUserDto } from '../dtos/user/user-update.dto';

@injectable()
export class UserService {
    constructor(
        @inject(UserModule.UserRepository)
        private readonly userRepository: UserRepository,
    ) {}

    /**
     * 자기 자신의 프로필을 조회한다
     * @param userIdx 로그인 한 유저의 인덱스
     * @returns profile정보
     */
    async getProfile(userIdx: number) {
        await this.checkExistingUser(userIdx);

        const profile = await this.userRepository.getUserProfileByIdx(userIdx);

        return profile;
    }

    /**
     * 자기 자신의 프로필을 수정한다
     * @param userIdx 로그인 한 유저의 인덱스
     * @param dto 회원정보 수정 dto
     * @returns 수정된 유저의 인덱스
     */
    async modifyProfile(userIdx: number, dto: UpdateUserDto) {
        await this.checkExistingUser(userIdx);

        return this.userRepository.updateUser(userIdx, dto);
    }

    /**
     * 자신의 계정을 삭제한다
     * @param userIdx 로그인 한 유저의 인덱스
     */
    async deleteUser(userIdx: number) {
        await this.checkExistingUser(userIdx);

        return this.userRepository.deleteUser(userIdx);
    }

    /**
     * 유저 인덱스로 해당하는 유저가 존재하는지 확인한다
     * @param userIdx 유저 인덱스
     */
    async checkExistingUser(userIdx: number) {
        const user = await this.userRepository.findUserByIdx(userIdx);

        if (!user) {
            throw new BadRequestException('해당하는 유저가 존재하지 않습니다');
        }
    }
}
