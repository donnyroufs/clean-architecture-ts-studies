import { Module } from '@nestjs/common';

import { UserRepositoryProvider } from '@infra/user/user.repository';
import { UserMapperProvider } from '@infra/user/user.mapper';
import { DBService } from '@infra/prisma/db.service';
import { DBContext } from '@infra/prisma/db.context';
import { HashServiceProvider } from '@infra/implementations/hash.service';
import { TokenServiceProvider } from '@infra/implementations/token.service';

@Module({
  providers: [
    DBService,
    DBContext,
    UserRepositoryProvider,
    UserMapperProvider,
    HashServiceProvider,
    TokenServiceProvider,
  ],
  exports: [
    UserRepositoryProvider,
    UserMapperProvider,
    HashServiceProvider,
    TokenServiceProvider,
  ],
})
export class InfraModule {}

export const InfraModuleImport = {
  global: true,
  module: InfraModule,
};
