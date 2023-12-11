export class CustomError extends Error {
    message: string;
    statusCode: number;
}

export class BadRequestException extends CustomError {
    constructor(message: string) {
        super(message);
        this.statusCode = 400;
    }
}

export class UnauthorizedException extends CustomError {
    constructor(message: string) {
        super(message);
        this.statusCode = 401;
    }
}
