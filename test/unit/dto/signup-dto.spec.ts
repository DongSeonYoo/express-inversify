import { SignupRequestDTO } from '../../../src/dtos/auth/signup/signup-req.dto';
import { User } from '../../../src/entities/user.entity';
import { BadRequestException } from '../../../src/utils/customError.util';

describe('signup dto를 테스트한다', () => {
    describe('signup dto의 static 메서드를 검증한다', () => {
        let body;
        beforeEach(() => {
            body = {
                email: 'inko51366@naver.com',
                pw: '1234..',
                name: 'testuser',
                personalColor: '123123',
                major: '2',
                entryYear: '23',
            };
        });
        it('body를 받아 회원가입 DTO를 of 메서드로 생성한다', () => {
            // when
            const expectedDto = SignupRequestDTO.of(body);

            // then
            expect(expectedDto).toBeInstanceOf(SignupRequestDTO);
        });

        it('dto를 받아 toEntity 메서드로 user 엔티티로 변환해준다', () => {
            const signupDto = SignupRequestDTO.of(body);

            // when
            const expectUserEntity = signupDto.toEntity();

            // then
            expect(expectUserEntity).toBeInstanceOf(User);
        });
    });

    describe('dto 내부에서 validation로직을 실행한다', () => {
        it('값이 하나라도 없으면 400에러를 던진다', () => {
            // given
            const body = {
                // email: 'inko51366@naver.com',
                pw: '1234..',
                name: 'testuser',
                personalColor: '123123',
                major: '2',
                entryYear: '23',
            };

            // when
            const createDtoFunc = () => {
                SignupRequestDTO.of(body);
            };

            // then
            expect(createDtoFunc).toThrow(BadRequestException);
        });
        it.todo('이메일 정규식을 검사한다');
        it.todo('패스워드 정규식을 검사한다');
        it.todo('이름 정규식을 검사한다');
        it.todo('major가 정수인지 검사한다');
        it.todo('entry year(입학 년도) 정규식을 검사한다');
    });
});
