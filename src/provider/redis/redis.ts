import { RedisClientType, SetOptions } from "redis"



export class RedisCache {
    constructor(
        private readonly client: RedisClientType<any, any, any>,
        private readonly options: SetOptions,
        private fetch: <T>(url: string, token: string) => Promise<T>
    ) { }

    async executeCachedFetchGet<T>(url: string, token: string): Promise<T> {
        const fetched = await this.client.get(url)
        if (fetched != null)
            return JSON.parse(fetched)
        return await this.fetchAndStore<T>(url, token)
    }

    private async fetchAndStore<T>(url: string, token: string) {
        const result = await this.fetch<T>(url, token)
        this.client.set(url, JSON.stringify(result), this.options)
        return result
    }
}
