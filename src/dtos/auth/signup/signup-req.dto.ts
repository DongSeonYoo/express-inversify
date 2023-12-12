import { User } from '../../../entities/user.entity';
import { validate } from '../../../utils/validate.util';

export class SignupRequestDTO {
    private email: string;
    private pw: string;
    private name: string;
    private major: any;
    private personalColor: string;
    private entryYear: any;

    private constructor() {}

    private static validation(dto: SignupRequestDTO) {
        validate(dto.email, 'email').checkInput();
        validate(dto.pw, 'pw').checkInput();
        validate(dto.name, 'name').checkInput();
        validate(dto.major, 'major').checkInput().isNumber();
        validate(dto.personalColor, 'personalColor').checkInput();
        validate(dto.entryYear, 'entryYear').checkInput();
    }

    static of(body: any): SignupRequestDTO {
        const dto = new SignupRequestDTO();
        dto.email = body.email;
        dto.pw = body.pw;
        dto.name = body.name;
        dto.major = body.major;
        dto.personalColor = body.personalColor;
        dto.entryYear = body.entryYear;

        SignupRequestDTO.validation(dto);

        return dto;
    }

    toEntity(): User {
        return User.create(
            this.email,
            this.pw,
            this.name,
            this.major,
            this.personalColor,
            this.entryYear,
        );
    }
}
