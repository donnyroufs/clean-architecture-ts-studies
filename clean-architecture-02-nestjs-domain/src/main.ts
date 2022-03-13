// import { Request, Response } from 'express'
import { Request, Response } from '@nestjs/common';
import {
  ClassSerializerInterceptor,
  HttpServer,
  ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { CommonDomainExceptionsFilter } from '@webApi/common/filters/common-domain-exceptions.filter';
import { WebApiModule } from '@webApi/web-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WebApiModule);

  const reflector = app.get(Reflector);
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalFilters(new CommonDomainExceptionsFilter(httpAdapter));

  await app.listen(5000);
}

bootstrap();
