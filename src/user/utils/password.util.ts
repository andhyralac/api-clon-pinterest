import { compareSync, genSaltSync, hashSync } from "bcryptjs";




export class Password {

    encrypted(password: string): string {
        const salt = genSaltSync(10);
        return hashSync(password, salt);
    }

    compare(password: string, unencryptedPassword: string): boolean {
        return compareSync(unencryptedPassword, password);
    }
}