import { User } from '../../entities/user.entity';
import { emailRegex, nameRegex, pwRegex } from '../../utils/constants/regex.constant';
import { validate } from '../../utils/validate.util';

export class SignupRequestDTO {
    email: string;
    password: string;
    name: string;
    major: any;
    personalColor: string;
    entryYear: any;

    private constructor() {}

    // 1. SignupRequestDto 인스턴스를 생성한다
    // 2. validation
    static of(body: any): SignupRequestDTO {
        const dto = new SignupRequestDTO();
        dto.email = body.email;
        dto.password = body.password;
        dto.name = body.name;
        dto.major = body.major;
        dto.personalColor = body.personalColor;
        dto.entryYear = body.entryYear;

        dto.validation();

        return dto;
    }

    toEntity(): User {
        const { email, password, name, major, personalColor, entryYear } = this;

        const user = new User();
        user.email = email;
        user.password = password;
        user.name = name;
        user.major = major;
        user.personalColor = personalColor;
        user.entryYear = entryYear;

        return user;
    }

    private validation() {
        validate(this.email, 'email').checkInput().checkRegex(emailRegex);
        validate(this.password, 'password').checkInput().checkRegex(pwRegex);
        validate(this.name, 'name').checkInput().checkRegex(nameRegex);
        validate(this.major, 'major').checkInput().isNumber();
        validate(this.personalColor, 'personalColor').checkInput();
        validate(this.entryYear, 'entryYear').checkInput().isNumber().checkLength(2, 2);
    }
}
