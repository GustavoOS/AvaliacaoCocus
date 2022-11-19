import { InvalidUser } from "../../../exception/invalid";

export function validateUser(user: string) {
    if(/[^A-Za-z\d\-]/.test(user))
        throw new InvalidUser(user)
}
