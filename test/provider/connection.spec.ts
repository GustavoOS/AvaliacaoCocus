import { Connection, RedisClient } from "../../src/provider/redis/connection"
import { RedisClientMock } from "./mock/redis"

describe("Test connection object", () => {
    beforeEach(() => {
        Connection.kill()
    })

    it("two instances should be equal", () => {
        const api = jest.mocked<RedisClient>(
            new RedisClientMock((x) => "get"))
        expect(Connection.make(api)).toBe(Connection.make(api))
    })

    it("get should call client", async () => {
        const get = jest.fn().mockReturnValue("get")
        const api = jest.mocked<RedisClient>(
            new RedisClientMock(get))
        Connection.make(api)
        expect(await api.get("a")).toEqual("get")
        expect(get).toHaveBeenCalledTimes(1)
    })
})
