import { BaseService } from "../../config/base.service";
import { Password } from "../utils/password.util";
import { QueryRunner } from "typeorm";
import { User } from "../entities/user.entity";
import { UserDTO } from '../dto/user.dto';



export class UserService extends BaseService<User> {
    constructor(
        private readonly password: Password = new Password()
    ){
        super(User);
    }

    async findOneByEmail(email: string): Promise<User | null> {
        const user = await this.execRepository.findOne({
            where: { email: email },
            relations: {
                profile: true
            }
        });

        return user;
    }

    /**
     * Crea un usuario dentro de una transacción.
     * Utiliza un QueryRunner para asegurar que la operación se ejecute de manera atómica.
     * @param user - El objeto de tipo `User` que contiene los datos del usuario a crear.
     * @param queryRunner - Un `QueryRunner` que maneja la transacción. Si no se pasa, la función debería lanzar un error o manejarlo de alguna manera.
     * @returns Promise<User> - Devuelve una promesa con el usuario creado, o un error si la transacción falla.
     */
    async createUserWithTransaction(user: UserDTO, queryRunner: QueryRunner): Promise<User> {
        user.password = this.password.encrypted(user.password);

        const newUser = this.execRepository.create(user);
        const result = await queryRunner.manager.save(newUser);

        return result;
    }

}