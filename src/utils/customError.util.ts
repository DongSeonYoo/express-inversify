import { ICommonResponse } from './common/response.common';

export class CustomError extends Error implements ICommonResponse {
    public statusCode: number;
    constructor(public message: string, public data?: Object) {
        super();
    }
}

export class BadRequestException extends CustomError {
    constructor(message: string, data?: string) {
        super(message, data);
        this.statusCode = 400;
    }
}

export class UnauthorizedException extends CustomError {
    constructor(message: string, data: string) {
        super(message, data);
        this.statusCode = 401;
    }
}
