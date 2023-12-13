import { ICommonResponse } from '../../../common/response.common';

export class SignupResponseDTO implements ICommonResponse {
    statusCode: number = 200;
    private constructor(
        public readonly data: Object,
        public readonly message: string,
    ) {}

    static fromEntity(data: Object, message: string) {
        return new SignupResponseDTO(data, message);
    }
}
