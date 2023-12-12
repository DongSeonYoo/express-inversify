import { SignupRequestDTO } from '../dtos/auth/signup/signup-req.dto';
import { SignupResponseDTO } from '../dtos/auth/signup/signup-res.dto';
import * as userRepository from '../repositories/user.repository';

export const signup = async (dto: SignupRequestDTO) => {
    try {
        const user = dto.toEntity();

        const result = await userRepository.signUp(user);

        return SignupResponseDTO.fromEntity(result, '회원가입 성공');
    } catch (error) {
        throw error;
    }
};
