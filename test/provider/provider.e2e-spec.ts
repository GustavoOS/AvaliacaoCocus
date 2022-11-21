/* istanbul ignore file */

import { UserRepo } from '../../src/domain/entity/UserRepo'
import { FetchError } from '../../src/exception/fetch'
import { disconnectRedis, mountDependencies } from '../../src/server/app.service'


const {service, redis, github} = mountDependencies()

describe("Test repo fetch from API", () => {

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

    it("with a valid repo, fetch branches", async () => {
        const repo = new UserRepo("AvaliacaoCocus", "GustavoOS", false)
        await github.fillRepoBranches(repo)
        expect(repo.branches.length).toEqual(1)
        const [branch] = repo.branches
        expect(branch.name).toEqual("master")
        expect([...branch.lastCommit].length).toBeGreaterThan(0)
    })


    afterAll(()=> disconnectRedis(redis))
})
