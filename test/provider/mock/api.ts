import { GithubAPI } from "../../../src/provider/github/api";
import { Branch } from "../../../src/domain/entity/Branch";
import { UserRepo } from "../../../src/domain/entity/UserRepo";

export class GithubAPIMock extends GithubAPI {
    constructor(
        private repos: ()=>UserRepo[],
        private branches: ()=>Branch[]
    ) { super(null, null)}

    override async getUserRepositories(owner: string) { return this.repos() }
    override async fillRepoBranches(repo: UserRepo) {
        repo.branches = this.branches()
    }
}

