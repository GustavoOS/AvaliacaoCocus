import { Branch } from '../../domain/entity/Branch'
import { UserRepo } from '../../domain/entity/UserRepo'
import { Environment } from '../env'
import { RedisCache } from '../redis/redis'
import { BranchResponse } from './dto/BranchResponse'
import { RepoResponse } from './dto/RepoResponse'

export class GithubAPI {
    constructor(private env: Environment, private fetcher: RedisCache) { }

    async getUserRepositories(user: string): Promise<UserRepo[]> {
        const repos = await this.fetcher.executeCachedFetchGet<RepoResponse[]>(
            `https://api.github.com/users/${user}/repos`,
            this.env.API_KEY,
        )
        return repos.map(repo => new UserRepo(repo.name, repo.owner.login, repo.fork))
    }

    async fillRepoBranches(repo: UserRepo) {
        const branches = await this.fetcher.executeCachedFetchGet<BranchResponse[]>(
            `https://api.github.com/repos/${repo.owner}/${repo.name}/branches`,
            this.env.API_KEY)
        repo.branches = branches.map(branch => new Branch(branch.name, branch.commit.sha))
    }
}
