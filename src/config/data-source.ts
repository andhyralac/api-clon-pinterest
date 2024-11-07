import { DataSource } from "typeorm";
import { ConfigServer } from "./config";



class ConfigDataSource extends ConfigServer {

    constructor(){
        super();
    }

    public dataSource(): DataSource {
        return new DataSource({
                type: "postgres",
                host: this.getEnvironment('DB_HOST'),
                port: this.getNumberEnv('DB_PORT'),
                username: this.getEnvironment('DB_USERNAME'),
                password:  this.getEnvironment('DB_PASSWORD'),
                database: this.getEnvironment('DB_NAME'),
                entities: [__dirname + "/../**/*.entity{.ts,.js}"],
                migrations: [__dirname + "/../migrations/*{.ts,.js}"],
                synchronize: false,
                migrationsRun: true,
                logging: true,
            })
    }
}

export const AppDataSource: DataSource = new ConfigDataSource().dataSource()
