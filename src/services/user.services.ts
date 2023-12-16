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

    async getProfile(userIdx: number) {
        await this.checkExistingUser(userIdx);

        const profile = await this.userRepository.getUserProfileByIdx(userIdx);

        return profile;
    }

    async modifyProfile(userIdx: number, dto: UpdateUserDto) {
        await this.checkExistingUser(userIdx);

        return this.userRepository.updateUser(userIdx, dto);
    }

    async deleteUser(userIdx: number) {
        await this.checkExistingUser(userIdx);

        return this.userRepository.deleteUser(userIdx);
    }

    async checkExistingUser(userIdx: number) {
        const user = await this.userRepository.findUserByIdx(userIdx);

        if (!user) {
            throw new BadRequestException('해당하는 유저가 존재하지 않습니다');
        }
    }
}
