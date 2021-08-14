import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { WebApiModule } from '@webApi/web-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WebApiModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  await app.listen(5000);
}

bootstrap();
