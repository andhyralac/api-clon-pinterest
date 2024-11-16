import { BaseRouter } from "../shared/router/router";
import { UserController } from "./controllers/user.controller";
import { UserMiddleware } from "./middlewares/user.middleware";




export class UserRouter extends BaseRouter<UserController, UserMiddleware> {

    constructor(){
        super(UserController, UserMiddleware);
    }

    routes(): void {
        this.router.post(
            '/users/register',
            (req, res, next) => this.middleware.userValidator(req, res, next),
            (req, res, next) => this.middleware.profileValidator(req, res, next),
            (req, res) => this.controller.Register(req, res)
        );
    }
}