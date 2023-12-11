import { SignupDTO } from '../../../src/dtos/auth/signup.dto';
import { BadRequestException } from '../../../src/utils/customError.util';
import { emailRegex } from '../../../src/constants/regex.constant';

describe('회원가입 dto를 검증한다', () => {
    it('email, pw, name, major, entryYear이 있으면 에러가 발생하지 않는다', () => {
        // given
        const signupRequest = {
            email: 'test123@naver.com',
            pw: '1234..',
            name: 'testuser',
            major: '2',
            entryYear: '23',
        };

        // when
        const expectValue = SignupDTO.of(signupRequest);

        // then
        expect(expectValue).toBeTruthy();
    });

    it('하나라도 값이 없을 경우 400 에러를 던진다', () => {
        // given
        const signupRequest = {
            // email: 'test123@naver.com',
            pw: '1234..',
            name: 'testuser',
            major: '2',
            entryYear: '23',
        };

        // when
        const expectFunc = () => {
            SignupDTO.of(signupRequest);
        };

        // then
        expect(expectFunc).toThrow(BadRequestException);
    });

    it('email 정규표현식을 지키지 않았을 시 400에러를 던진다', () => {
        // given
        const signupRequest = {
            email: 'inko51366@naver.com@naver.com',
            pw: '1234..',
            name: 'testuser',
            major: '2',
            entryYear: '23',
        };

        // when
        const expectFunc = () => {
            SignupDTO.of(signupRequest);
        };

        // then
        expect(expectFunc).toThrow(BadRequestException);
    });
});
