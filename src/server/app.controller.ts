import { Controller, Get, Logger, Param, Req } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { validateContentType } from './validator/validator';

@ApiTags('Repositories')
@Controller('repositories')
export class AppController {
  private readonly logger = new Logger(AppController.name);
  constructor(private readonly appService: AppService) {}

  @Get(':username')
  @ApiParam({name: 'username', required: true, description: 'Github username', schema: {type: 'string'}})
  async getRepos(
    @Param() params: ReposParams,
    @Req() request: Request) {
    this.logger.log(`New request for ${params.username}`)
    validateContentType(request.headers['accept'])
    return await this.appService.getRepo(params.username)
  }
}

interface ReposParams {
  username: string
}
