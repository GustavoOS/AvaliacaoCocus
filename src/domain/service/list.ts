import { GithubGateway } from "../gateway/github";
import { RepositoryDTO, toDTO } from "./dto/repo";
import { validateUser } from "./validator/validator";

export class ListRepoService {
    constructor(private gateway: GithubGateway) {}

    async listUserReposWithoutFork(user: string): Promise<RepositoryDTO[]> {
        validateUser(user)
        const repos = await this.gateway.findByOwnerWihoutFork(user)
        return repos.map(toDTO)
    }
}
