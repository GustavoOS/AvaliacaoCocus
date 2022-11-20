import { Controller, Get, Header, Logger, Param, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { validateContentType } from './validator/validator';

@Controller()
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get(':username')
  async getRepos(@Param() params, @Req() request: Request) {
    this.logger.warn(`New request for ${params.username}`)
    validateContentType(request.headers['accept'])
    return await this.appService.getRepo(params.username)
  }
}
