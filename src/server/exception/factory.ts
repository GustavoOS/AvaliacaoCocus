import { InvalidUser } from "../../exception/invalid";
import { FetchError } from "../../exception/fetch";
import { ErrorResponse } from "./filter";
import { HttpStatus } from "@nestjs/common";
import { InvalidContentType } from "./invalid";


function errToResponse(e: Error, status) {
    return { "message": e.message, "status": status }
}

const fetchToResponse = (e: Error) => {
    const err = e as FetchError
    return errToResponse(err, err.status)
}

const invalidToResponse = (e: Error): ErrorResponse => {
    const err = e as InvalidUser
    return errToResponse(err, HttpStatus.NOT_FOUND)
}

const unkownResponse = (err: Error): ErrorResponse => {
    return errToResponse(err, HttpStatus.INTERNAL_SERVER_ERROR)
}

const errorMap = new Map([
    [`${FetchError.name}`, fetchToResponse],
    [`${InvalidUser.name}`, invalidToResponse],
    [`${InvalidContentType.name}`,(e)=> errToResponse(e, HttpStatus.NOT_ACCEPTABLE)]
])

export function toErrorResponse(err: Error): ErrorResponse {
    let fun = errorMap.get(err.constructor.name) ?? unkownResponse
    return fun(err)
}
