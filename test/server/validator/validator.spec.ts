import { InvalidContentType } from "../../../src/server/exception/invalid"
import { validateContentType } from "../../../src/server/validator/validator"

const browserAccept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"

describe("test content type accept validator", () => {
    it("should accept regular browser accept", () => {
        expect(()=>validateContentType(browserAccept)).not.toThrow()
    })

    it("application/json should not throw", () => {
        expect(()=>validateContentType("application/json")).not.toThrow()
    })

    it("application/xml should throw", () => {
        expect(()=>validateContentType("application/xml")).toThrow(InvalidContentType)
    })
})
