import { inject, injectable } from 'inversify';
import { LoginDto } from '../dtos/auth/login.dto';
import { SignupRequestDTO } from '../dtos/auth/signup.dto';
import { compare, hashing } from '../utils/bcrypt.util';
import { BadRequestException } from '../utils/customError.util';
import { UserRepository } from '../repositories/user.repository';
import { UserModule } from '../configs/inversify/types';

@injectable()
export class AuthService {
    constructor(@inject(UserModule.UserRepository) private userRepository: UserRepository) {}

    /**
     * 사용자 정보를 받아 회원가입한다.
     * @param dto 회원가입 dto
     * @returns 생성된 userId
     */
    async signup(dto: SignupRequestDTO) {
        const { email, password } = dto;
        // 이메일 중복 검사
        await this.checkDuplicateEmail(email);

        // 비밀번호 암호화
        const hashedPassword = await hashing(password);
        dto.password = hashedPassword;

        // user 엔티티 생성
        const user = dto.toEntity();
        const userId = await this.userRepository.signUp(user);

        return userId;
    }

    /**
     * email, password를 받아 로그인을 진행한다
     * @param dto email, password
     * @returns userIdx, email을 리턴한다
     */
    async login(dto: LoginDto) {
        const { email, password } = dto;

        // 해당하는 이메일이 존재할 경우 비밀번호를 비교한다
        const foundUser = await this.userRepository.findUserByEmail(email);
        if (!foundUser) {
            throw new BadRequestException('아이디 또는 비밀번호가 일치하지 않습니다');
        }

        // 비밀번호와 암호화된 비밀번호를 비교한다
        const passwordMatch = await compare(password, foundUser.password);
        if (!passwordMatch) {
            throw new BadRequestException('아이디 또는 비밀번호가 일치하지 않습니다');
        }

        return {
            userIdx: foundUser.id,
            email: foundUser.email,
        };
    }

    /**
     * 중복된 이메일이 존재하는지 확인, 존재하면 true, 존재하지 않으면 false
     * 삭제 된 컬럼의 이메일도 체크한다
     * @param email 중복 체크 할 이메일
     */
    async checkDuplicateEmail(email: string) {
        const foundUser = await this.userRepository.duplicateCheckEmail(email);
        if (foundUser) {
            throw new BadRequestException('중복된 이메일이 존재합니다');
        }
    }
}
