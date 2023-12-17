import { nameRegex } from '../../utils/constants/regex.constant';
import { validate } from '../../utils/validate.util';

export class UpdateUserDto {
    name: string;
    entryYear?: number;
    major?: number;

    static of(body: any) {
        const dto = new UpdateUserDto();
        dto.name = body.name;
        dto.entryYear = body.entryYear;
        dto.major = body.major;

        dto.validation();

        return dto;
    }

    private validation() {
        validate(this.name, 'name').checkInput().checkRegex(nameRegex);
        validate(this.entryYear, 'entryYear').checkInput().checkLength(2, 2).isNumber();
        validate(this.major, 'major').checkInput().isNumber();
    }
}
