import { SignupRequestDTO } from '../../../src/dtos/auth/signup.dto';
import { BadRequestException } from '../../../src/utils/customError.util';

describe('signup dto를 테스트한다', () => {
    let body;
    beforeEach(() => {
        body = {
            email: 'test123@inha.edu',
            password: '0000Asd..',
            name: 'yood',
            major: 23,
            personalColor: 333333,
            entryYear: 23,
        };
    });
    it('signup request dto를 생성한다', () => {
        // then
        expect(SignupRequestDTO.of(body)).toBeInstanceOf(SignupRequestDTO);
    });

    it('email 정규식에 맞지 않을 경우 400 에러를 던진다', () => {
        // given
        body.email = 'test123@naver.com';

        // when
        const func = () => {
            SignupRequestDTO.of(body);
        };

        // then
        expect(func).toThrow(BadRequestException);
    });

    it('password 정규식에 맞지 않을 경우 400에러를 던진다', () => {
        // given
        body.password = '0000Asd';

        // when
        const func = () => {
            SignupRequestDTO.of(body);
        };

        // then
        expect(func).toThrow(BadRequestException);
    });

    it('name 정규식에 맞지 않을 경우 400에러를 던진다', () => {
        // given
        // 숫자는 X
        body.name = 'yoodongseon123';

        // when
        const func = () => {
            SignupRequestDTO.of(body);
        };

        // then
        expect(func).toThrow(BadRequestException);
    });

    it('major가 정수가 아닐 시 400에러를 던진다', () => {
        // given
        // 숫자 X
        body.major = '12s3';

        // when
        const func = () => {
            SignupRequestDTO.of(body);
        };

        // then
        expect(func).toThrow(BadRequestException);
    });

    it('entry year(입학 년도)는 정수가 아닐 시 400에러를 던진다', () => {
        // given
        body.entryYear = '23';

        // when
        const func = () => {
            SignupRequestDTO.of(body);
        };

        // then
        expect(func).toThrow(BadRequestException);
    });

    it('entry year(입학 년도)는 두 자리 숫자가 아닐시 400에러를 던진다', () => {
        // given
        body.entryYear = 232;

        // when
        const func = () => {
            SignupRequestDTO.of(body);
        };

        // then
        expect(func).toThrow(BadRequestException);
    });
});
