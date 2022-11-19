import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':username')
  async getRepos(@Param() params) {
    return await this.appService.getRepo(params.username)
  }
}
