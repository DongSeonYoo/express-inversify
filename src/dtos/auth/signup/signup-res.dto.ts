import { ICommonResponse } from '../../../common/response.common';

export class SignupResponseDTO implements ICommonResponse {
    constructor(
        public readonly data: number,
        public readonly message: string,
    ) {}

    static fromEntity(id: number, message: string) {
        return new SignupResponseDTO(id, message);
    }
}
