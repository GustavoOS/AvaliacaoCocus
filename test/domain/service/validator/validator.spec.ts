import { InvalidUser } from "../../../../src/exception/invalid"
import { validateUser } from "../../../../src/domain/service/validator/validator"

describe("Reinforce user rules", () => {
    it("Valid user should not throw", () => {
        expect(()=>validateUser('Az-3')).not.toThrow()
    })

    it("Invalid should throw", () => {
        expect(()=>validateUser('Az_3')).toThrow(InvalidUser)
    })
})
