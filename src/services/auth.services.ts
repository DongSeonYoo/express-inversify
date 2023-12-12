import { SignupRequestDTO } from '../dtos/auth/signup/signup-req.dto';
import { SignupResponseDTO } from '../dtos/auth/signup/signup-res.dto';
import * as userRepository from '../repositories/user.repository';

export const signup = async (dto: SignupRequestDTO) => {
    const user = dto.toEntity();

    const userId = await userRepository.signUp(user);

    return SignupResponseDTO.fromEntity({ userId }, '회원가입 성공');
};
