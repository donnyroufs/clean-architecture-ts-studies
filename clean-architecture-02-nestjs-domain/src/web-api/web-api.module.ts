import { MiddlewareConsumer, Module } from '@nestjs/common';

import { ApplicationModuleImport } from '@application/application.module';
import { InfraModuleImport } from '@infra/infra.module';
import { UserController } from '@webApi/user/user.controller';
import { AuthMiddleware } from './common/middleware/auth.middleware';

@Module({
  imports: [ApplicationModuleImport, InfraModuleImport],
  controllers: [UserController],
})
export class WebApiModule {
  public configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
