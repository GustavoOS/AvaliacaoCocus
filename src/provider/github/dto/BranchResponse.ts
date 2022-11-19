export interface BranchResponse{
    name: string
    commit: Commit
}

interface Commit {
    sha: string
}
