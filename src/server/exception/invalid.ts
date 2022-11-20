export class InvalidContentType extends Error {
    constructor(type: string){
        super(`Invalid content type ${type}.`)
    }
}
