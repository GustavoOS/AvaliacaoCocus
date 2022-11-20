import { Injectable } from '@nestjs/common'
import { GithubAPI } from '../provider/github/api'

import * as dotenv from 'dotenv'
import { GithubAdapter } from '../provider/github/adapter'
import { ListRepoService } from '../domain/service/list'

dotenv.config()

@Injectable()
export class AppService {
  async getRepo(user: string) {
    const service = new ListRepoService(new GithubAdapter(new GithubAPI(process.env.API_KEY)))
    return await service.listUserReposWithoutFork(user)
  }
}
