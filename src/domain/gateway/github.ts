import { UserRepo } from '../entity/UserRepo'

export interface GithubGateway {
    findByOwnerWihoutFork(owner: string): Promise<UserRepo[]>
}
