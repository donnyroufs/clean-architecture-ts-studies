import { Module } from '@nestjs/common';
import { ApplicationModule } from '@application/application.module';
import { UserController } from '@webApi/user/user.controller';
import { InfraModule } from '@infra/infra.module';

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
