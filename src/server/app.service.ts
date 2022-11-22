import { Injectable } from '@nestjs/common'
import { GithubAPI } from '../provider/github/api'

import * as dotenv from 'dotenv'
import { GithubAdapter } from '../provider/github/adapter'
import { ListRepoService } from '../domain/service/list'
import { Environment } from '../provider/env'
import { RedisCache } from '../provider/redis/redis'
import { executeAuthorizedGET } from '../provider/http/fetch'
import { createClient, RedisClientType } from 'redis'


@Injectable()
export class AppService {
    async getRepo(user: string) {
        const { service, redis } = mountDependencies()
        const result = await service.listUserReposWithoutFork(user)
        disconnectRedis(redis)
        return result
    }
}

export function mountDependencies() {
    dotenv.config()
    const env: Environment = process.env as unknown as Environment
    const redis = connectToRedis(env)
    const cache = new RedisCache(
        redis,
        { EX: env.REDIS_EXPIRATION_IN_SECONDS },
        executeAuthorizedGET)
    const github = new GithubAPI(env, cache)
    const service = new ListRepoService(new GithubAdapter(github))
    return { service, redis, github }
}

function connectToRedis(env: Environment): RedisClientType<any, any, any> {
    const client = createClient({
        password: env?.REDIS_PASSWORD,
        socket: { host: env?.REDIS_URL }
    })
    if (!client.isOpen)
        client.connect()
    return client
}

export function disconnectRedis(client: RedisClientType<any, any, any>) {
    if (client.isOpen)
        client.quit()
}
