import { GithubGateway } from '../../domain/gateway/github';
import { GithubAPI } from './api';

export class GithubAdapter implements GithubGateway {
    constructor (private api: GithubAPI){}

    async findByOwnerWihoutFork(owner: string){
        const repos = (await this.api.getUserRepositories(owner)).filter(repo => !repo.isForked)
        await Promise.all(repos.map(repo => this.api.fillRepoBranches(repo)))
        return repos
    }
}
