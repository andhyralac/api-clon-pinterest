import { QueryRunner } from "typeorm";
import { AppDataSource } from "./data-source";



export  abstract class TransactionBaseService {
    constructor(){}

    async startTransaction() {
        const queryRunner = AppDataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        return queryRunner;
    }

    // Commitea la transacción
    async commitTransaction(queryRunner: QueryRunner) {
        await queryRunner.commitTransaction();
    }

    // Reversa la transacción
    async rollbackTransaction(queryRunner: QueryRunner) {
        await queryRunner.rollbackTransaction();
    }

    // Libera los recursos del QueryRunner
    async releaseTransaction(queryRunner: QueryRunner) {
        await queryRunner.release();
    }
}