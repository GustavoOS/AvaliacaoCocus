import * as dotenv from 'dotenv'
import { createClient, RedisClientOptions } from 'redis'
import { ListRepoService } from '../../domain/service/list'
import { Environment } from '../../provider/env'
import { GithubAdapter } from '../../provider/github/adapter'
import { GithubAPI } from '../../provider/github/api'
import { executeAuthorizedGET } from '../../provider/http/fetch'
import { Connection, RedisClient } from '../../provider/redis/connection'
import { RedisCache } from '../../provider/redis/redis'

export function mountDependencies() {
    dotenv.config()
    const env: Environment = process.env as unknown as Environment
    const cache = mountRedis(env)
    const github = new GithubAPI(env, cache)
    const service = new ListRepoService(new GithubAdapter(github))
    return { service, github }
}

function mountRedis(env: Environment) {
    const conf: RedisClientOptions = {
        password: env?.REDIS_PASSWORD,
    }
    if (env?.REDIS_URL)
        conf.socket = { host: env.REDIS_URL }
    const client = createClient(conf)
    const connection = Connection.make(client as RedisClient)
    return new RedisCache(
        connection,
        { EX: env.REDIS_EXPIRATION_IN_SECONDS },
        executeAuthorizedGET
    )
}