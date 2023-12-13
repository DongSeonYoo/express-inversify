import { LoginRequestDto } from '../dtos/auth/login/login-req.dto';
import { LoginResponseDTO } from '../dtos/auth/login/login-res.dto';
import { SignupRequestDTO } from '../dtos/auth/signup/signup-req.dto';
import { SignupResponseDTO } from '../dtos/auth/signup/signup-res.dto';
import * as userRepository from '../repositories/user.repository';
import { compare, hashing } from '../utils/bcrypt.util';
import { BadRequestException } from '../utils/customError.util';

export const signup = async (dto: SignupRequestDTO) => {
    const { email, password } = dto;
    // 이메일 중복 검사
    const foundUser = await userRepository.findUserByEmail(email);
    if (foundUser) {
        throw new BadRequestException('중복된 이메일이 존재합니다');
    }
    // 비밀번호 암호화
    const hashedPassword = await hashing(password);
    dto.password = hashedPassword;

    // user 엔티티 생성
    const user = dto.toEntity();
    const userId = await userRepository.signUp(user);

    return SignupResponseDTO.fromEntity({ userId }, '회원가입 성공');
};

export const login = async (dto: LoginRequestDto) => {
    const { email, pw: password } = dto;

    // 해당하는 이메일이 존재할 경우 비밀번호를 비교한다
    const foundUser = await userRepository.findUserByEmail(email);
    if (!foundUser) {
        throw new BadRequestException('아이디가 일치하지 않음');
    }

    // 비밀번호와 암호화된 비밀번호를 비교한다
    const passwordMatch = await compare(password, foundUser.password);
    if (!passwordMatch) {
        throw new BadRequestException('비밀번호가 일치하지 않습니다');
    }

    // 토큰발급 or 세션생성
    return LoginResponseDTO.fromEntity({ userId: foundUser.id }, '로그인 성공');
};
