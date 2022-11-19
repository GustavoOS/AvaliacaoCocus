export interface RepoResponse {
    name: string;
    owner: Owner;
    fork: boolean;
}

interface Owner {
    login: string;
}
