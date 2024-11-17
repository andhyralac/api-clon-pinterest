import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { UserDTO } from "../../user/dto/user.dto";
import { HttpResponse } from "../../shared/response/http.response";
import { ErrorHandler } from "../../shared/errors/errorHandler";




export class AuthController {
    constructor(
        private readonly authService: AuthService = new AuthService(),
        private readonly httResponse: HttpResponse = new HttpResponse()
    ){}

    async login(req: Request, res: Response) {
        const user: UserDTO = req.body;
        try {
            const result = await this.authService.login(user);
            this.httResponse.Ok(res, result);
        } catch (error) {
            if ( error instanceof ErrorHandler ) {
                error.response(res);
            } else {
                this.httResponse.InternalServerError(res, error);
            }
        }
    }
}