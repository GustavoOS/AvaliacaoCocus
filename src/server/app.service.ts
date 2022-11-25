import { Injectable, OnModuleDestroy } from '@nestjs/common'


import { Connection } from '../provider/redis/connection'
import { mountDependencies } from './factory/configuration'

@Injectable()
export class AppService implements OnModuleDestroy {

    async getRepo(user: string) {
        const { service } = mountDependencies()
        return await service.listUserReposWithoutFork(user)
    }

    onModuleDestroy() {
        Connection.kill()
    }
}

