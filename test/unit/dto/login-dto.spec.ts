import { LoginDto } from '../../../src/dtos/auth/login.dto';
import { BadRequestException } from '../../../src/utils/customError.util';

describe('login dto를 테스트한다', () => {
    let body;

    beforeEach(() => {
        body = {
            email: 'test123@inha.edu',
            password: '0000Asd..',
        };
    });

    it('login dto를 생성한다', () => {
        // then
        expect(LoginDto.of(body)).toBeInstanceOf(LoginDto);
    });

    describe('입력받은 이메일을 검사한다', () => {
        it('이메일의 길이가 비정상적일 시 400에러를 던진다', () => {
            // given
            body.email = 'test123@inha.edutest123@inha.edutest123@inha.edutest123@inha.edutest123@inha.edutest123@inha.edutest123@inha.edutest123@inha.edutest123@inha.edutest123@inha.eduedutest123@inha.edutest123@inha.edutest123@inha.edutest123@inha.eduedutest123@inha.edutest123@edu';

            // when
            const func = () => {
                LoginDto.of(body);
            };

            // then
            expect(func).toThrow(BadRequestException);
        });

        it('이메일이 입력되지 않았을 경우 400에러를 던진다', () => {
            // given
            body.email = '';

            // when
            const func = () => {
                LoginDto.of(body);
            };

            // then
            expect(func).toThrow(BadRequestException);
        });
    });

    describe('입력받은 비밀번호를 검사한다', () => {
        it('비밀번호의 길이가 비정상적일 시 400에러를 던진다', () => {
            // given
            body.password = '0101010101010101010101010101010101010101010101010101010101010';

            // when
            const func = () => {
                LoginDto.of(body);
            };

            // then
            expect(func).toThrow(BadRequestException);
        });

        it('비밀번호가 입력되지 않았을 경우 400에러를 던진다', () => {
            // given
            body.password = '';

            // when
            const func = () => {
                LoginDto.of(body);
            };

            // then
            expect(func).toThrow(BadRequestException);
        });
    });
});
