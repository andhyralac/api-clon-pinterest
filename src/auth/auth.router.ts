import { BaseRouter } from "../shared/router/router";
import { UserMiddleware } from "../user/middlewares/user.middleware";
import { AuthController } from "./controllers/auth.controller";





export class AuthRouter extends BaseRouter<AuthController, UserMiddleware> {

    constructor(){
        super(AuthController, UserMiddleware);
    }

    routes(): void {
        this.router.post(
            '/auth/login',
            (req, res, next) => this.middleware.userValidator(req, res, next),
            (req, res) => this.controller.login(req, res)
        );
    }
}