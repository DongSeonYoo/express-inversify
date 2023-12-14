export interface ICommonResponse {
    message: string;
    data?: Object;
    statusCode: number;
}

export class Success implements ICommonResponse {
    message: string;
    statusCode: number = 200;
    data?: Object;

    constructor(message: string, data?: Object) {
        this.message = message;
        this.data = data;
    }
}

export class Fail implements ICommonResponse {
    message: string;
    statusCode: number;
    data?: Object;

    constructor(message: string, statusCode: number, data?: Object) {
        this.message = message;
        this.statusCode = statusCode;
        this.data = data;
    }
}
