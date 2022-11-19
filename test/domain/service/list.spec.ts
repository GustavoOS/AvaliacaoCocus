import { GithubAPIMock } from "../../provider/mock/api"
import { GithubAPI } from "../../../src/provider/github/api"
import { mockBranches, mockUserRepo } from "../../provider/adapter.spec"
import { GithubAdapter } from "../../../src/provider/github/adapter"
import { ListRepoService } from "../../../src/domain/service/list"

const api = jest.mocked<GithubAPI>(new GithubAPIMock(mockUserRepo, mockBranches))
const adapter = new GithubAdapter(api)
const service = new ListRepoService(adapter)

describe("test list service", ()=>{
    it("assert full way", async()=> {
        const list = await service.listUserReposWithoutFork("GustavoOS")
        expect(list.length).toEqual(2)
    })
})
