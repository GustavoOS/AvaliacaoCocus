import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ExceptionFilter } from './exception/filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks()
  enableSwagger(app);
  app.useGlobalFilters(new ExceptionFilter())
  await app.listen(3000);
}
bootstrap();


function enableSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Github Explorer')
    .setDescription('Explore github API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
}

