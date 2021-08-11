import { Module } from '@nestjs/common';

import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { TokenServiceToken } from '@application/tokens/token-service.token';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { HashServiceToken } from '@application/tokens/hash-service.token';
import { UserRepository } from '@infra/user/user.repository';
import { UserMapper } from '@infra/user/user.mapper';
import { DBService } from '@infra/prisma/db.service';
import { DBContext } from '@infra/prisma/db.context';
import { HashService } from '@infra/implementations/hash.service';
import { TokenService } from '@infra/implementations/token.service';

@Module({
  providers: [
    DBService,
    DBContext,
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: UserMapperToken,
      useClass: UserMapper,
    },
    {
      provide: HashServiceToken,
      useClass: HashService,
    },
    {
      provide: TokenServiceToken,
      useClass: TokenService,
    },
  ],
  exports: [
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: UserMapperToken,
      useClass: UserMapper,
    },
    {
      provide: HashServiceToken,
      useClass: HashService,
    },
    {
      provide: TokenServiceToken,
      useClass: TokenService,
    },
  ],
})
export class InfraModule {}
