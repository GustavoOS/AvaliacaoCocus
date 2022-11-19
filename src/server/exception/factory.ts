import { InvalidUser } from "../../exception/invalid";
import { FetchError } from "../../exception/fetch";
import { ErrorResponse } from "./filter";
import { HttpStatus } from "@nestjs/common";

const fetchToResponse = (e: Error) => {
    const err = e as FetchError
    return { "message": err.message, "status": err.status }
}

const invalidToResponse = (e: Error): ErrorResponse => {
    const err = e as InvalidUser
    return { "message": err.message, "status": HttpStatus.NOT_FOUND }
}

const unkownResponse = (err: Error): ErrorResponse => {
    return { "message": err.message, "status": HttpStatus.INTERNAL_SERVER_ERROR }
}

const errorMap = new Map([
    [`${FetchError.name}`, fetchToResponse],
    [`${InvalidUser.name}`, invalidToResponse]
])

export function toErrorResponse(err: Error): ErrorResponse {
    let fun = errorMap.get(err.constructor.name) ?? unkownResponse
    return fun(err)
}
