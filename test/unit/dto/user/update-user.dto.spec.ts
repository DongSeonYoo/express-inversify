import { UpdateUserDto } from '../../../../src/dtos/user/user-update.dto';
import { BadRequestException } from '../../../../src/utils/customError.util';

describe('user-update dto를 테스트한다', () => {
    let body;

    beforeEach(() => {
        body = {
            name: '유동선',
            entryYear: 12,
            major: 2,
        };
    });

    it('user update dto를 생성한다', () => {
        // then
        expect(UpdateUserDto.of(body)).toBeInstanceOf(UpdateUserDto);
    });

    describe('유효성 검증을 테스트한다', () => {
        it('name 정규식에 맞지 않을 경우 400 에러를 던진다', () => {
            // given
            body.name = '유동선1';

            // when
            const func = () => {
                UpdateUserDto.of(body);
            };

            // then
            expect(func).toThrow(BadRequestException);
        });

        it('entry year가 정수가 아닐 경우 400에러를 던진다', () => {
            // given
            body.entryYear = '23';

            // when
            const func = () => {
                UpdateUserDto.of(body);
            };

            // then
            expect(func).toThrow(BadRequestException);
        });

        it('major가 정수가 아닐 경우 400 에러를 던진다', () => {
            // given
            body.major = '2';

            // when
            const func = () => {
                UpdateUserDto.of(body);
            };

            // then
            expect(func).toThrow(BadRequestException);
        });
    });
});
