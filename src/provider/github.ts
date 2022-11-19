import { FetchError } from '../exception/fetch'
import { UserRepoDTO } from '../domain/dto/UserRepo'
import { RepoResponse } from './dto/RepoResponse'

export class Github {
    constructor(private apiKey: string) { }

    getUserRepositories = async (user: string): Promise<UserRepoDTO[]> => {
        const repos = (await executeGET(
            `https://api.github.com/users/${user}/repos`,
            this.apiKey,
        )) as RepoResponse[]
        console.debug(repos)
        return repos.map((repo) => new UserRepoDTO(repo.name, repo.owner.login, repo.fork))
    }
}

// eslint-disable-next-line @typescript-eslint/ban-types
const executeGET = async (url: string, token: string): Promise<Object[]> => {
    const res = await fetch(url, {
        headers: new Headers({
            Authorization: token,
            Accept: 'application/vnd.github+json'
        })
    })
    if(!res.ok)
        throw new FetchError(res)        
    return await res.json()
}
