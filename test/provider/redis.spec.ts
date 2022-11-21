import { createClient } from "redis"
import { RedisCache } from "../../src/provider/redis/redis"

const client = createClient({ password: 'Redis2022!' })
let fetch: any
let redis: RedisCache

describe("test redis cache", () => {

    beforeAll(() => client.connect())

    beforeEach(() => {
        fetch = jest.fn().mockReturnValue(Promise.resolve([0, 1]))
        redis = new RedisCache(client, { EX: 3600 }, fetch)
    })

    afterEach(() => {
        client.flushDb()
    })

    it("first time should save and return", async () => {
        const result = await redis.executeCachedFetchGet<number[]>('http://myhost', 'bla')
        expect(result.length).toEqual(2)
        expect(result.every((el, i) => el === i)).toBeTruthy()
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it("the second time should return the same", async () => {
        const call = async () => await redis.executeCachedFetchGet<number[]>('http://myhost', 'bla')
        await call()
        const result = await call()
        expect(result.length).toEqual(2)
        expect(result.every((el, i) => el === i)).toBeTruthy()
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it("after 10 calls, fetch should be called once", async () => {
        for (const _ in range(10)) {
            const result = await redis.executeCachedFetchGet<number[]>('http://myhost', 'bla')
            expect(result.every((el, i) => el === i)).toBeTruthy()
        }
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    afterAll(() => {
        client.quit()
    })
})

export const range = (max: number) => [...Array(max).keys()]
