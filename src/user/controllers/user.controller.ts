import { Request, Response } from "express";


import { HttpResponse } from "../../shared/response/htt.response";
import { ProfileDTO } from "../dto/profile.dto";
import { TransactionService } from "../services/transactions.service";
import { UserDTO } from "../dto/user.dto";



export class UserController {
    constructor(
        private readonly transactionService: TransactionService = new TransactionService(),
        private readonly httReponse: HttpResponse = new HttpResponse()
    ){}

    async Register(req: Request, res: Response) {
        const user: UserDTO = req.body;
        const profile: ProfileDTO = req.body;

        try {
            const r = await this.transactionService.createUserAndProfile(profile, user);
            return this.httReponse.Created(res, r);
        } catch (error) {
            return this.httReponse.InternalServerError(res, 'An error occurred on the server to process the request');
        }
    }



}