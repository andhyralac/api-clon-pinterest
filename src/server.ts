import "reflect-metadata";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";


import { AppDataSource } from './config/data-source';
import { corsOptions } from "./config/cors.config";
import { ConfigServer } from "./config/config";



class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv("PORT");

    constructor() {
        super();
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))

        this.app.use(cors(corsOptions));
        this.app.use(helmet());
        if ( this.nodeEnv === 'development' ) {
            this.app.use(morgan('dev'));
        }

        this.dbConnect();
        // this.app.use("/api/v1/", this.routers());
        this.listen();
    }

    private routers(): Array<express.Router> {
        return [];
    }

    private dbConnect(): void {
        AppDataSource.initialize()
            .then(() => console.log('database connect'))
            .catch((error) => console.log(error))
    }

    public listen(): void {
        this.app.listen(this.port);
        console.log(`Listen in ${this.port}`);
    }


}


new ServerBootstrap();