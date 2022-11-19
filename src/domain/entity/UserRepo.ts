import { Branch } from "./Branch";

export class UserRepo {
    public branches: Branch[]

    constructor(
        public name: string,
        public owner: string,
        public isForked: boolean,
    ) {}
}
