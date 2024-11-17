import { BaseService } from "../../config/base.service";
import { ErrorHandler } from "../../shared/errors/errorHandler";
import { HttpStatus } from "../../shared/response/http.response";
import { Category } from "../entities/category.entity";



export class CategoryService extends BaseService<Category> {

    constructor(
        private readonly httpStatus = HttpStatus
    ) {
        super(Category);
    }

    async findAll() {
        const categories = await this.execRepository.find({
            select: {
                id: true,
                description: true
            }
        })
        if (!categories) {
            throw new ErrorHandler(this.httpStatus.NOT_FOUND, 'No categories found');
        }

        return categories
    }
}