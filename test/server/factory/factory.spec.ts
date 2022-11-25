import { HttpStatus } from "@nestjs/common"
import { InvalidUser } from "../../../src/exception/invalid";
import { FetchError } from "../../../src/exception/fetch"
import { toErrorResponse } from "../../../src/server/factory/exception"


describe("test error response factory", () => {
    it("fetch error", () => {
        const err = new FetchError(HttpStatus.I_AM_A_TEAPOT)
        expect(toErrorResponse(err).status).toEqual(HttpStatus.I_AM_A_TEAPOT)
    })

    it("invalid user", () => {
        const err = new InvalidUser('A$3')
        expect(toErrorResponse(err).status).toEqual(HttpStatus.NOT_FOUND)
    })

    it("random error", () => {
        const err = new Error("error message")
        const res = toErrorResponse(err)
        expect(res.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR)
        expect(res.message).toEqual("error message")
    })
})
