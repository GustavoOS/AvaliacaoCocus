import { HttpStatus } from "@nestjs/common"

export class FetchError extends Error {
    status: HttpStatus

    constructor(res: Response){
        super(`Fetch failed: ${HttpStatus[res.status]}`)
        this.status = res.status
    }
}
