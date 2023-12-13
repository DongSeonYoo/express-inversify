import { validate } from '../../../utils/validate.util';

export class LoginRequestDto {
    email: string;
    pw: string;

	private constructor() {}

    static of(body: any): LoginRequestDto {
        const dto = new LoginRequestDto();
        dto.email = body.email;
        dto.pw = body.pw;

        dto.validate();

        return dto;
    }

    private validate() {
        validate(this.email, 'email').checkInput();
        validate(this.pw, 'password').checkInput();
    }
}
