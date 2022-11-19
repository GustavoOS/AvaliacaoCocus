export class UserRepoDTO {
    constructor(
        public name: string,
        public owner: string,
        public isForked: boolean,
    ) {}
}
