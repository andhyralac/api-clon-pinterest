import { Response } from "express";


export enum HttpStatus {
    OK = 200,
    CREATED = 201,
    BAD_REQUEST = 400,
    NOT_FOUND = 404,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    INTERNAL_SERVER_ERROR = 500,
}


export class HttpResponse {
    Ok(res: Response, data?: any): Response {
        return res.status(HttpStatus.OK).json({
            error: false,
            status: HttpStatus.OK,
            statusMsg: "Ok",
            data: data
        })
    }

    Created(res: Response, data?: any): Response {
        return res.status(HttpStatus.CREATED).json({
            error: false,
            status: HttpStatus.CREATED,
            statusMsg: "Created",
            data: data
        })
    }

    BadRequest(res: Response, data?: any): Response {
        return res.status(HttpStatus.BAD_REQUEST).json({
            error: true,
            status: HttpStatus.BAD_REQUEST,
            statusMsg: "Bad Request",
            data: data
        })
    }

    NotFound(res: Response, data?: any): Response {
        return res.status(HttpStatus.NOT_FOUND).json({
            error: true,
            status: HttpStatus.NOT_FOUND,
            statusMsg: "Not Found",
            data: data,
        })
    }

    Unauthorized(res: Response, data?: any): Response {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            error: true,
            status: HttpStatus.UNAUTHORIZED,
            statusMsg: "Unauthorized",
            data: data,
        });
    }

    Forbidden(res: Response, data?: any): Response {
        return res.status(HttpStatus.FORBIDDEN).json({
            error: true,
            status: HttpStatus.FORBIDDEN,
            statusMsg: "Forbidden",
            data: data,
        });
    }

    InternalServerError(res: Response, data?: any): Response {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            error: true,
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            statusMsg: "Internal server error",
            data: data,
        });
    }
}