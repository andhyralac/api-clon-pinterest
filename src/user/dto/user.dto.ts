import { 
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsUUID,
} from "class-validator";
import { BaseDTO } from "../../config/base.dto";
import { Profile } from "../entities/profile.entity";




export class UserDTO extends BaseDTO {

    @IsNotEmpty()
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!: string;

    @IsOptional()
    @IsNotEmpty()
    @IsUUID()
    profile!: Profile;



}