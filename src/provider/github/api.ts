import { FetchError } from '../../exception/fetch'
import { UserRepo } from '../../domain/entity/UserRepo'
import { RepoResponse } from './dto/RepoResponse'
import { BranchResponse } from './dto/BranchResponse'
import { Branch } from '../../domain/entity/Branch'

export class GithubAPI {
    constructor(private apiKey: string) { }

    async getUserRepositories(user: string): Promise<UserRepo[]> {
        const repos = await executeGET<RepoResponse>(
            `https://api.github.com/users/${user}/repos`,
            this.apiKey,
        )
        return repos.map(repo => new UserRepo(repo.name, repo.owner.login, repo.fork))
    }

    async fillRepoBranches(repo: UserRepo) {
        const branches = await executeGET<BranchResponse>(
            `https://api.github.com/repos/${repo.owner}/${repo.name}/branches`,
            this.apiKey)
        repo.branches = branches.map(branch => new Branch(branch.name, branch.commit.sha))
    }
}

async function executeGET<T>(url: string, token: string): Promise<T[]> {
    const res = await fetch(url, {
        headers: new Headers({
            Authorization: token,
            Accept: 'application/vnd.github+json'
        })
    })
    if (!res.ok)
        throw new FetchError(res.status)
    return await res.json()
}
