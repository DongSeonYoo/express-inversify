import { UsingJoinColumnOnlyOnOneSideAllowedError } from 'typeorm';
import errorMessage from '../constants/validate.constant';
import { BadRequestException } from './customError.util';

class Validate {
    constructor(private readonly input: any, private readonly name: string) {}

    /**
     * undefinded or empty string 을 검사
     */
    checkInput() {
        if (this.input === undefined || this.input === '') {
            this.setError(errorMessage.invalidInput);
        }
        return this;
    }

    /**
     * @param min 최소값
     * @param max 최대값
     * 길이를 검사
     */
    checkLength(min: number, max: number) {
        if (this.input.length < min || this.input.length > max) {
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

    isNumber() {
        if (isNaN(Number(this.input))) this.setError(errorMessage.isNumber);
        return this;
    }

    setError(message: string) {
        throw new BadRequestException(`${this.name}: ${message}`);
    }
}

export const validate = (input: string | undefined, name: string) => {
    const result = new Validate(input, name);

    return result;
};
