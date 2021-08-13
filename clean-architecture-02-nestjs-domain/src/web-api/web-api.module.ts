import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ApplicationModule } from '@application/application.module';
import { InfraModule } from '@infra/infra.module';
import { UserController } from '@webApi/user/user.controller';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [
    {
      global: true,
      module: ApplicationModule,
    },
    {
      global: true,
      module: InfraModule,
    },
  ],
  controllers: [UserController],
})
export class WebApiModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
