import { inject, injectable } from 'inversify';
import { UserModule } from '../configs/inversify/types';
import { UserRepository } from '../repositories/user.repository';
import { NotFoundException } from '../utils/customError.util';

@injectable()
export class UserService {
    constructor(@inject(UserModule.UserRepository) private readonly userRepository: UserRepository) {}

    async getProfile(userIdx: number) {
        const foundUser = await this.userRepository.getUserProfileByIdx(userIdx);

        if (!foundUser) {
            throw new NotFoundException('해당하는 사용자가 존재하지 않습니다');
        }

        return foundUser;
    }
}
