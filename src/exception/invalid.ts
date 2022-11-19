export class InvalidUser extends Error {
    constructor(user: string){
        super(`Invalid user ${user}.`)
    }
}
