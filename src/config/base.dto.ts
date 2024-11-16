import { IsDate, IsNotEmpty, IsOptional, IsUUID } from "class-validator";



export class BaseDTO {
    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    id!: string;

    @IsDate()
    @IsOptional()
    createdAt!: Date;

    @IsDate()
    @IsOptional()
    updatedAt!: Date;
}