import { validate } from "class-validator";

import { HttpResponse } from "../response/http.response";
import { NextFunction, Request, Response } from "express";
import passport from "../../auth/utils/passport.util";
import { Token } from "../../auth/utils/jwt.util";

import { User } from "../../user/entities/user.entity";


export class SharedMiddleware {
    constructor(
        private httpResponse: HttpResponse = new HttpResponse(),
        private token: Token = new Token()
    ){}

    authenticateJWT(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('jwt', { session: false }, (err: any, user: User) => {
            if (err || !user ) {
                return this.httpResponse.Unauthorized(res, 'Unauthorized or invalid token')
            }

            req.user = {
                id: user.id,
                email: user.email,
                profileId: user.profile.id
            };
            next();
        })(req, res, next); // se pasan los parametros(req, res, next) a passport.authenticate
    }

    validateDto(valid: object, res: Response, next: NextFunction){
        validate(valid).then((errors) => {
            if (errors.length > 0) {
                return this.httpResponse.BadRequest(res, errors.map( error => {
                    return {
                        property: error.property,
                        constraints: error.constraints
                    }
                }));
            } else {
                next();
            }
        })
    }
}