import { RedisClientType, SetOptions } from "redis"



export class RedisCache {
    constructor(
        private readonly redis: RedisClientType<any, any, any>,
        private readonly options: SetOptions,
        private fetch: <T>(url: string, token: string) => Promise<T>
    ) {
        redis.on("error", (error) => {
            throw new Error(`REDIS connection error: ${error}`)
        })
    }

    async executeCachedFetchGet<T>(url: string, token: string): Promise<T> {
        const fetched = await this.redis.get(url)
        if (fetched != null)
            return JSON.parse(fetched)
        return await this.fetchAndStore<T>(url, token)
    }

    private async fetchAndStore<T>(url: string, token: string) {
        const result = await this.fetch<T>(url, token)
        this.redis.set(url, JSON.stringify(result), this.options)
        return result
    }
}
