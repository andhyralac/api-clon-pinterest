import { ErrorHandler } from "../../shared/errors/errorHandler";
import { HttpStatus } from "../../shared/response/http.response";
import { UserDTO } from "../../user/dto/user.dto";
import { UserService } from '../../user/services/user.service';
import { Password } from "../../user/utils/password.util";
import { Token } from "../utils/jwt.util";



export class AuthService {


    constructor(
        private readonly userService: UserService = new UserService(),
        private readonly password: Password = new Password(),
        private readonly token: Token = new Token(),
        private readonly httpStatus = HttpStatus
    ){}

    async login(userBody: UserDTO) {
        const user = await this.userService.findOneByEmail(userBody.email);

        if (!user) {
            throw new ErrorHandler(this.httpStatus.BAD_REQUEST, 'Incorrect username or password');
        }

        const isMatch = this.password.compare(user.password, userBody.password)
        if (!isMatch) {
            throw new ErrorHandler(this.httpStatus.BAD_REQUEST, 'Incorrect username or password');
        }

        const tokenUser = this.token.generate({ id: user.id, email: user.email });

        return {
            user: `${user.profile.name} ${user.profile.lastname}`,
            token: tokenUser
        }

    }
}