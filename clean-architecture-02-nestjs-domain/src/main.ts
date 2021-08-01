import { NestFactory } from '@nestjs/core';
import { WebApiModule } from './web-api/web-api.module';

async function bootstrap() {
  const app = await NestFactory.create(WebApiModule);
  await app.listen(5000);
}

bootstrap();
