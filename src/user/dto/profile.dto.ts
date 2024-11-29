import { IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { BaseDTO } from "../../config/base.dto";



export class ProfileDTO extends BaseDTO {

    @IsNotEmpty()
    name!: string;

    @IsNotEmpty()
    lastname!: string;

    @IsNotEmpty()
    nickname!: string;

    @IsOptional()
    @IsNotEmpty()
    img!: string;

}