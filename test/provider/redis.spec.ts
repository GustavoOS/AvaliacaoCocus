import { Connection } from "../../src/provider/redis/connection"
import { RedisCache } from "../../src/provider/redis/redis"
import { RedisClientMock } from "./mock/redis"


let fetch: (url: any) => Promise<any>
let connection: Connection
let redis: RedisCache

describe("test redis cache", () => {

    beforeEach(() => {
        fetch = jest.fn().mockReturnValue(Promise.resolve([0, 1]))
        Connection.kill()
    })

    it("first time should save and return", async () => {
        mockRedisResponse([null])

        const result = await redis.executeCachedFetchGet<number[]>('http://myhost', 'bla')
        expect(result.length).toEqual(2)
        expect(result.every((el, i) => el === i)).toBeTruthy()
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it("the second time should return the same", async () => {
        mockRedisResponse([null, JSON.stringify(range(2))])
        const call = async () => await redis.executeCachedFetchGet<number[]>('http://myhost', 'bla')
        await call()
        const result = await call()
        expect(result.length).toEqual(2)
        expect(result.every((el, i) => el == i)).toBeTruthy()
        expect(fetch).toHaveBeenCalledTimes(1)
    })

    it("after 10 calls, fetch should be called once", async () => {
        mockRedisResponse([null, ...range(9).map(() => JSON.stringify(range(2)))])
        for (const _ in range(10)) {
            const result = await redis.executeCachedFetchGet<number[]>('http://myhost', 'bla')
            expect(result.every((el, i) => el == i)).toBeTruthy()
        }
        expect(fetch).toHaveBeenCalledTimes(1)
    })
})

export const range = (max: number) => [...Array(max).keys()]

function mockRedisResponse(response:string[]) {
    const api = new RedisClientMock()
    api.reset(response)
    connection = Connection.make(api)
    redis = new RedisCache(connection,{}, fetch)
}
