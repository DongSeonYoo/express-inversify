import { emailRegex } from '../../constants/regex.constant';
import { validate } from '../../utils/validate.util';

export class SignupDTO {
    email: string;
    pw: string;
    name: string;
    major: string;
    entryYear: string;

    private constructor() {}

    static of(body: any): SignupDTO {
        const dto = new SignupDTO();
        dto.email = body.email;
        dto.pw = body.pw;
        dto.name = body.name;
        dto.major = body.major;
        dto.entryYear = body.entryYear;

        SignupDTO.validation(dto);

        return dto;
    }

    private static validation(dto: SignupDTO) {
        validate(dto.email, 'email').checkInput();
        validate(dto.pw, 'pw').checkInput().checkRegex(emailRegex);
        validate(dto.name, 'name').checkInput();
        validate(dto.major, 'major').checkInput();
        validate(dto.major, 'major').checkInput();
        validate(dto.entryYear, 'entryYear').checkInput();
    }
}
