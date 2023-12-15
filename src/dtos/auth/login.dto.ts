import { validate } from '../../utils/validate.util';

export class LoginDto {
    email: string;
    password: string;

    private constructor() {}

    static of(body: any): LoginDto {
        const dto = new LoginDto();
        dto.email = body.email;
        dto.password = body.password;

        dto.validate();

        return dto;
    }

    private validate() {
        validate(this.email, 'email').checkInput().checkLength(1, 256);
        validate(this.password, 'password').checkInput().checkLength(1, 60);
    }
}
