import { emailRegex } from '../../src/constants/regex.constant';
import { BadRequestException } from '../../src/utils/customError.util';
import { validate } from '../../src/utils/validate.util';

describe('utils/validation 클래스를 테스트한다', () => {
    let createValidation;
    let name = 'testVaue';

    beforeEach(() => {
        createValidation = (input: any, name: string) => {
            return validate(input, name);
        };
    });

    describe('checkInput 메서드를 테스트한다', () => {
        it('input이 undefined면 에러를 던진다', () => {
            // given
            const input = undefined;
            const valid = createValidation(input, name);

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
            const valid = createValidation(input, name);

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
            const valid = createValidation(input, name);

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

            const valid = createValidation(input, name);

            // when
            const checkLengthFunc = () => {
                valid.checkLength(min, max);
            };

            // then
            expect(checkLengthFunc).toThrow(BadRequestException);
        });
    });

    describe('checkRegex 메서드를 테스트한다', () => {
        it.todo('이메일 정규식을 통과하지 못하면 400에러를 던진다');
    });
});
