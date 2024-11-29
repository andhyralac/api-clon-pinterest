import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy, StrategyOptions } from "passport-jwt";
import { ConfigServer } from "../../config/config";
import { UserService } from '../../user/services/user.service';
import { IUserPayload } from "../interfaces/userPayload.interface";



class PassportUtil extends ConfigServer {
    constructor(
        private readonly userService: UserService = new UserService(),
    
    ){
        super();
    }

    use(){
        const jwtOptions: StrategyOptions  = {
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: this.getEnvironment('JWT_SECRET')!
        }

        passport.use(
            new JwtStrategy(jwtOptions, async (jwt_payload: IUserPayload, done) => {
                try {
                    const user = await this.userService.findOneByEmail(jwt_payload.email)
                    if (!user) {
                        return done(null, false);
                    }

                    return done(null, user)
                } catch (error) {
                    console.log(error);
                    return done(error, false);
                }
            })
        )
    }
}

new PassportUtil().use();
export default passport

