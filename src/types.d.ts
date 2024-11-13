import * as express from "express";

import { IUserPayload } from "./auth/interfaces/userPayload.interface";



declare global {
    namespace Express {
        interface Request {
            user?: IUserPayload; // Definir el tipo que desees para el usuario, como un tipo de interfaz de usuario
        }
    }
}