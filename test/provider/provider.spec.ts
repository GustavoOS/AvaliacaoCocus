import exp from 'constants'
import * as dotenv from 'dotenv'
import { FetchError } from '../../src/exception/fetch'
import { Github } from '../../src/provider/github'

dotenv.config()

describe("Test API call", () => {
    const github = new Github(process.env.API_KEY)

    it("After true call, every repo should belong to same owner", async () => {
        const owner = "GustavoOS"
        const res = await github.getUserRepositories(owner)
        expect(Array.isArray(res)).toBeTruthy()
        expect(res.length).toBeGreaterThan(0)
        expect(res.every((repo) => repo.owner === owner)).toBeTruthy()
    })

    it("Call invalid shall throw something", () => {
        const res = () => github.getUserRepositories("kjhgfghjkjhghjk")
        expect(res).rejects.toBeInstanceOf(FetchError)
    })

    it("call invalid shall have 404 status", () => {
        github.getUserRepositories("kjhgfghjkjhghjk").catch(
            e => expect(e.status).toEqual(404))
    })
})
