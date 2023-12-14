import { validate } from '../../utils/validate.util';

export class LoginDto {
    email: string;
    password: string;

    private constructor() {}

    static of(body: any): LoginDto {
        const dto = new LoginDto();
        dto.email = body.email;
        dto.password = body.pw;

        dto.validate();

        return dto;
    }

    private validate() {
        validate(this.email, 'email').checkInput();
        validate(this.password, 'password').checkInput();
    }
}
