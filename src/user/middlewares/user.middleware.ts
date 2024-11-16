import { NextFunction, Request, Response } from "express";

import { SharedMiddleware } from "../../shared/middlewares/shared.middleware";
import { UserDTO } from "../dto/user.dto";
import { ProfileDTO } from "../dto/profile.dto";




export class UserMiddleware extends SharedMiddleware {
    constructor(){
        super();
    }

    userValidator(req: Request, res: Response, next: NextFunction){
        const {
            email, password
        } = req.body;

        const valid = new UserDTO();
        valid.email = email;
        valid.password = password;

        this.validateDto(valid, res, next);
    }

    profileValidator(req: Request, res: Response, next: NextFunction){
        const {
            name, lastname, nickname
        } = req.body;

        const valid = new ProfileDTO();
        valid.name = name;
        valid.lastname = lastname;
        valid.nickname = nickname;

        this.validateDto(valid, res, next);
    }


}