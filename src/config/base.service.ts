import { EntityTarget, QueryRunner, Repository } from "typeorm";
import { AppDataSource } from "./data-source";
import { BaseEntity } from "./base.entity";



export class BaseService<T extends BaseEntity> {
    public execRepository: Repository<T>;
    constructor(entity: EntityTarget<T>){
        this.execRepository = AppDataSource.getRepository( entity );
    }

}