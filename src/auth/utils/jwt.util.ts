import jwt from "jsonwebtoken";
import { ConfigServer } from "../../config/config";
import { IUserPayload } from "../interfaces/userPayload.interface";




export class Token extends ConfigServer {

    // se asigna el secret de jwt en una variable privada
    private jwtSecret: string = this.getEnvironment('JWT_SECRET')!;

    constructor(
        private readonly jwtInstance = jwt
    ){
        super();
    }

    // funcion para generar el token
    generate(payload: IUserPayload) {
        return this.jwtInstance.sign(payload, this.jwtSecret, { expiresIn: '4h' });
    }

    // funcion para verificar el token
    verify(token: string): IUserPayload {
        try {
            return this.jwtInstance.verify(token, this.jwtSecret) as IUserPayload;
        } catch (error) {

            if (error instanceof jwt.TokenExpiredError) {
                throw new Error('Token has expired');
            }
            if (error instanceof jwt.JsonWebTokenError) {
                throw new Error('Invalid token');
            }
            if (error instanceof jwt.NotBeforeError) {
                throw new Error('Token is not valid yet');
            }
            throw new Error('Token verification failed');
        }
    }
}