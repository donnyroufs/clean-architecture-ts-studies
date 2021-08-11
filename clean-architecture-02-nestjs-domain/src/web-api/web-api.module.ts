import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';

import { ApplicationModule } from '@application/application.module';
import { InfraModule } from '@infra/infra.module';
import { UserController } from '@webApi/user/user.controller';

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
export class WebApiModule {}
