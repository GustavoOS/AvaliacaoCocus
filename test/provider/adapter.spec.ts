import { UserRepo } from '../../src/domain/entity/UserRepo'
import { GithubAdapter } from '../../src/provider/github/adapter'
import { GithubAPI } from '../../src/provider/github/api'
import { Branch } from '../../src/domain/entity/Branch'
import { GithubAPIMock } from './mock/api'
import { FetchError } from '../../src/exception/fetch'


let adapter: GithubAdapter
export function mockUserRepo() {
    return [
        new UserRepo("ARMAria", "GustavoOS", false),
        new UserRepo("gOS", "GustavoOS", false),
        new UserRepo("myLinux", "GustavoOS", true)
    ]
}

export function mockBranches() { return [new Branch("master", "sha")] }

const OWNER = 'GustavoOS'


describe("Test Github Adapter", () => {
    it("test success", async () => {
        const api = jest.mocked<GithubAPI>(new GithubAPIMock(mockUserRepo, mockBranches))
        adapter = new GithubAdapter(api)
        const result = await adapter.findByOwnerWihoutFork(OWNER)
        expect(result.length).toEqual(2)
        expect(result.every(repo => repo.isForked)).toBeFalsy()
        expect(result.every(repo => repo.branches != null)).toBeTruthy()
        expect(result.every(repo => repo.branches.length > 0)).toBeTruthy()
        expect(result.every(repo => repo.branches[0].name === 'master')).toBeTruthy()
    })

    it('test branch failure', async () => {
        const api = jest.mocked<GithubAPI>(
            new GithubAPIMock(mockUserRepo, () => { throw new FetchError(500) }))
        adapter = new GithubAdapter(api)
        expect(adapter.findByOwnerWihoutFork(OWNER)).rejects.toThrow(FetchError)
        try {
            await adapter.findByOwnerWihoutFork(OWNER)
            fail()
        } catch (error) {
            expect(error.status).toEqual(500)
        }
    })

})
