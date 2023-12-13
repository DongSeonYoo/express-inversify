import { ICommonResponse } from '../../../utils/common/response.common';

export class LoginResponseDTO implements ICommonResponse {
    statusCode: number = 200;
    constructor(
        public readonly data: Object,
        public readonly message: string,
    ) {}

    static fromEntity(data: Object, message: string) {
        return new LoginResponseDTO(data, message);
    }
}
