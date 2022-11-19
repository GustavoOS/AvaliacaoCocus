import { UserRepo } from "src/domain/entity/UserRepo"
import { BranchDTO } from "./branch"

export interface RepositoryDTO {
    name: string
    owner: string
    isForked: boolean
    branches: BranchDTO[]
}


export function toDTO(repo: UserRepo): RepositoryDTO{
    return {
        "name": repo.name,
        "owner": repo.owner,
        "isForked": repo.isForked,
        "branches": repo.branches.map(branch => {return {
            "name": branch.name,
            "lastCommit": branch.lastCommit
        }})
    }

}
