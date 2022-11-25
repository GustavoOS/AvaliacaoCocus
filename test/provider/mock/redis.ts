import { SetOptions } from "redis";
import { RedisClient } from "../../../src/provider/redis/connection";

export class RedisClientMock implements RedisClient {
    call: number = -1
    responses: string[]
    reset(responses: string[]) {
        this.responseFunction = null
        this.responses = responses
        this.call = -1
    }

    constructor(private responseFunction: (key: string) => string = null) { }

    async get(key: string): Promise<string> {
        if(this.responseFunction !== null)
            return this.responseFunction(key)
        this.call += 1
        const val = this.responses[this.call]
        return val
    }
    async set(key: string, value: string, options: SetOptions): Promise<any> { }
    async flushDb(): Promise<any> { }
    async connect(): Promise<void> {
        this.isOpen = true
    }
    async quit(): Promise<void> {
        this.isOpen = false
    }
    isOpen: boolean = false;

}