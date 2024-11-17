import { SharedMiddleware } from "../shared/middlewares/shared.middleware";
import { BaseRouter } from "../shared/router/router";
import { CategoryController } from "./controllers/category.controller";



export class CategoryRouter extends BaseRouter<CategoryController, SharedMiddleware> {
    constructor() {
        super(CategoryController, SharedMiddleware);
    }

    routes(): void {
        this.router.get(
            '/categories',
            (req, res, next) => this.middleware.authenticateJWT(req, res, next),
            (req, res) => this.controller.getAll(req, res)
        )
    }
}