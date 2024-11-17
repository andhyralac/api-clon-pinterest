import { Response } from "express";
import { HttpResponse, HttpStatus } from "../response/http.response";




export class ErrorHandler extends Error {

    public statusCode: number;
    private readonly httpStatus = HttpStatus;
    private readonly httpResponse: HttpResponse;

    constructor(statusCode: number, message: string){
        super(message);
        this.name = this.constructor.name;
        this.statusCode = statusCode;
        this.httpResponse = new HttpResponse();
    }

    response(res: Response){
        if ( this.statusCode === this.httpStatus.BAD_REQUEST ) {
            this.httpResponse.BadRequest(res, this.message);
        }
        if ( this.statusCode === this.httpStatus.NOT_FOUND ) {
            this.httpResponse.NotFound(res, this.message);
        }
        if ( this.statusCode === this.httpStatus.UNAUTHORIZED ) {
            this.httpResponse.Unauthorized(res, this.message);
        }
        if ( this.statusCode === this.httpStatus.FORBIDDEN ) {
            this.httpResponse.Forbidden(res, this.message);
        }
    }
}