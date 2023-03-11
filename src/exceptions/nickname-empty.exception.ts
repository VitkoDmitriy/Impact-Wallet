import { HttpException, HttpStatus } from "@nestjs/common";

export class NicknameEmptyException extends HttpException {

    message: any;

    constructor(response: string | Record<string, any>) {
        super(response, HttpStatus.BAD_REQUEST);
        this.message = response;
    }

}