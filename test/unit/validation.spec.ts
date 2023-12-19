import { nameRegex } from '../../src/utils/constants/regex.constant';
import { BadRequestException } from '../../src/utils/customError.util';
import { validate } from '../../src/utils/validate.util';

describe('utils/validation 클래스를 테스트한다', () => {
    let name = 'testVaue';

    describe('checkInput 메서드를 테스트한다', () => {
        it('input이 undefined면 에러를 던진다', () => {
            // given
            const input = undefined;
            const valid = validate(input, name);

            // when
            const checkInputFunc = () => {
                valid.checkInput();
            };

            // then
            expect(checkInputFunc).toThrow(BadRequestException);
        });

        it('input이 empty string이면 에러를 던진다', () => {
            // given
            const input = '';
            const valid = validate(input, name);

            // when
            const checkInputFunc = () => {
                valid.checkInput();
            };

            // then
            expect(checkInputFunc).toThrow(BadRequestException);
        });

        it('성공 시 그대로 통과한다', () => {
            // given
            const input = 'string';
            const valid = validate(input, name);

            // then
            expect(valid.checkInput()).toEqual({ input, name });
        });
    });

    describe('checkLength 메서드를 테스트한다', () => {
        it('지정한 min, max 범위를 벗어날 시 에러를 던진다', () => {
            // given
            const input = '123456';
            const min = 1;
            const max = 5;

            const valid = validate(input, name);

            // when
            const checkLengthFunc = () => {
                valid.checkLength(min, max);
            };

            // then
            expect(checkLengthFunc).toThrow(BadRequestException);
        });
    });

    describe('checkRegex 메서드를 테스트한다', () => {
        it('정규식을 통과하지 못하면 400에러를 던진다', () => {
            // given
            // 이름은 한글 or 영어로만 이루어져 있어야 함
            const input = '유동선2';
            const valid = validate(input, name);

            // when
            const chceckRegexFunc = () => {
                valid.checkRegex(nameRegex);
            };

            // then
            expect(chceckRegexFunc).toThrow(BadRequestException);
        });
    });

    describe('isNumber 메서드를 테스트한다', () => {
        it('input이 정수가 아닐 경우 400에러를 던진다', () => {
            // given
            const input = 'qwer';
            const valid = validate(input, name);

            // when
            const checkIsNumberFunc = () => {
                valid.isNumber();
            };

            // then
            expect(checkIsNumberFunc).toThrow(BadRequestException);
        });

        it('input이 정수일 경우엔 에러를 던지지 않는다', () => {
            // given
            const input = 123;
            const valid = validate(input, name);

            // when
            const checkIsNumberFunc = () => {
                valid.isNumber();
            };

            // then
            expect(checkIsNumberFunc).not.toThrow(BadRequestException);
        });

        it('input이 하나라도 정수가 아닐 경우 에러를 던진다', () => {
            // given
            const input = '123a';
            const valid = validate(input, name);

            // when
            const checkIsNumberFunc = () => {
                valid.isNumber();
            };

            // then
            expect(checkIsNumberFunc).toThrow(BadRequestException);
        });

        it('input이 string 타입 정수이면 그대로 통과한다', () => {
            // given
            const input = '123';

            // when
            const func = () => {
                validate(input, name).isNumber();
            };

            // then
            expect(func).not.toThrow(BadRequestException);
        });
    });

    describe('isBoolean 메서드를 테스트한다', () => {
        it('input boolean이 아닐 경우 400에러를 던진다', () => {
            // given
            const input = 'qwer';
            const valid = validate(input, name);

            // when
            const checkIsNumberFunc = () => {
                valid.isBoolean();
            };

            // then
            expect(checkIsNumberFunc).toThrow(BadRequestException);
        });

        it('input boolean일 경우 그대로 통과한다', () => {
            // given
            const input = true;
            const valid = validate(input, name);

            // when
            const func = () => {
                valid.isBoolean();
            };

            // then
            expect(func).not.toThrow(BadRequestException);
        });
    });
});
