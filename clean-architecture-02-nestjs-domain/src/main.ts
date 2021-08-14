import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { WebApiModule } from '@webApi/web-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WebApiModule);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(5000);
}

bootstrap();
