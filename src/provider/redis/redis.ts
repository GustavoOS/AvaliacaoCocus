import { SetOptions } from "redis"
import { Connection } from "./connection"



export class RedisCache {
    constructor(
        private readonly redis: Connection,
        private readonly options: SetOptions,
        private fetch: <T>(url: string, token: string) => Promise<T>
    ) { }

    async executeCachedFetchGet<T>(url: string, token: string): Promise<T> {
        const fetched = await this.redis.get(url)
        if (fetched !== null)
            return JSON.parse(fetched)
        return await this.fetchAndStore<T>(url, token)
    }

    private async fetchAndStore<T>(url: string, token: string) {
        const result = await this.fetch<T>(url, token)
        this.redis.set(url, JSON.stringify(result), this.options)
        return result
    }
}
