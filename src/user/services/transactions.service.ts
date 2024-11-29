import { AppDataSource } from "../../config/data-source";
import { ProfileDTO } from "../dto/profile.dto";
import { ProfileService } from "./profile.service";
import { UserDTO } from "../dto/user.dto";
import { UserService } from "./user.service";
import { Token } from "../../auth/utils/jwt.util";
import { TransactionBaseService } from "../../config/transaction.service";




export class TransactionService extends TransactionBaseService {
    constructor(
        private readonly profileService: ProfileService = new ProfileService(),
        private readonly userService: UserService = new UserService(),
        private readonly token: Token = new Token()
    ){
        super();
    }


    async createUserAndProfile(profile: ProfileDTO, user: UserDTO){
        // profileService tiene una clase heredad llamada BaseService que contiene
        // una funcion para crear un (createQueryRunner)
        const queryRunner = await this.startTransaction();


        try {
            // se cre un nuevo perfil
            const newProfile = await this.profileService.createProfileWithTransaction(profile, queryRunner);
            user.profile = newProfile;

            // se crea el usuario
            const newUser = await this.userService.createUserWithTransaction(user, queryRunner);
            const tokenUser = this.token.generate({ id: newUser.id, email: newUser.email });

            await this.commitTransaction(queryRunner);

            return {
                user: `${newProfile.name} ${newProfile.lastname}`,
                token: tokenUser
            }
        } catch (error) {
            await this.rollbackTransaction(queryRunner);
            console.log(error);
        }finally {
            await this.releaseTransaction(queryRunner);
        }
    }
}