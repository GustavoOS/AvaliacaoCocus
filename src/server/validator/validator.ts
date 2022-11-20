import { InvalidContentType } from "../exception/invalid";

export function validateContentType(contentType: string) {
    if(![/application\/json/, /\*\/\*/].some(r => r.test(contentType)))
        throw new InvalidContentType(contentType)
}
