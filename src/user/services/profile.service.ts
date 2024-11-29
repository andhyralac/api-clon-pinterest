import { QueryRunner } from "typeorm";
import { BaseService } from "../../config/base.service";
import { ProfileDTO } from "../dto/profile.dto";
import { Profile } from "../entities/profile.entity";



export class ProfileService extends BaseService<Profile> {

    constructor(){
        super(Profile);
    }

    /**
     * Crea un perfil de usuario dentro de una transacción.
     * Utiliza un QueryRunner para asegurar que la operación se ejecute de manera atómica.
     * @param profile - El objeto de tipo `Profile` que contiene los datos del perfil a crear.
     * @param queryRunner - Un `QueryRunner` que maneja la transacción. Si no se pasa, la función debería lanzar un error o manejarlo de alguna manera.
     * @returns Promise<Profile> - Devuelve una promesa con el perfil creado, o un error si la transacción falla.
     */
    async createProfileWithTransaction(profile: ProfileDTO, queryRunner: QueryRunner): Promise<Profile> {
        const newProfile = this.execRepository.create(profile)
        const result = await queryRunner.manager.save(newProfile);
        return result
    }
}