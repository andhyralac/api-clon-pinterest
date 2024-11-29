import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { HttpResponse } from "../../shared/response/http.response";
import { ErrorHandler } from "../../shared/errors/errorHandler";




export class CategoryController {

    constructor(
        private readonly categoryService: CategoryService = new CategoryService(),
        private readonly httpResponse: HttpResponse = new HttpResponse()
    ) {}

    async getAll( req: Request, res: Response ) {
        try {
            const categories = await this.categoryService.findAll();
            this.httpResponse.Ok(res, categories);
        } catch (error) {
            if (error instanceof ErrorHandler) {
                error.response(res);
            } else {
                this.httpResponse.InternalServerError(res, error);
            }
        }
    }
}