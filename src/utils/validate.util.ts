import errorMessage from './constants/validate.constant';
import { BadRequestException } from './customError.util';

class Validate {
    constructor(private readonly input: any, private readonly name: string) {}

    /**
     * undefinded or empty string 을 검사
     */
    checkInput() {
        if (this.input === undefined || this.input === '') {
            this.setError(errorMessage.invalidInput + this.name);
        }
        return this;
    }

    /**
     * @param min 최소값
     * @param max 최대값
     * 길이를 검사
     */
    checkLength(min: number, max: number) {
        const input = String(this.input);
        if (input.length < min || input.length > max) {
            this.setError(errorMessage.length);
        }
        return this;
    }

    /**
     * @param regex 테스트 할 정규식
     */
    checkRegex(regex: RegExp) {
        if (!regex.test(this.input)) {
            this.setError(errorMessage.regex);
        }
        return this;
    }

    /**
     * 1. string타입이라면 정수인지 검사한다
     */
    isNumber() {
        if (isNaN(Number(this.input))) {
            this.setError(errorMessage.isNumber);
        }

        return this;
    }

    /**
     * boolean 타입인지 검사한다
     */
    isBoolean() {
        if (typeof this.input !== 'boolean') this.setError(errorMessage.isBoolean);
        return this;
    }

    setError(message: string) {
        throw new BadRequestException(message, this.name);
    }
}

export const validate = (input: any, name: string) => {
    const result = new Validate(input, name);

    return result;
};
