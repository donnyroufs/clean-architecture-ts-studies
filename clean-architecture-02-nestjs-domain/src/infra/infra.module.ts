import { Module } from '@nestjs/common';

import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { UserRepository } from '@infra/user/user.repository';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserMapper } from './user/user.mapper';

@Module({
  providers: [
    {
      provide: UserRepositoryToken,
      useClass: UserRepository,
    },
    {
      provide: UserMapperToken,
      useClass: UserMapper,
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
  ],
})
export class InfraModule {}
