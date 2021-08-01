import { Module } from '@nestjs/common';
import { RegisterUserUseCase } from './user/usecases/register-user.usecase';

@Module({
  providers: [RegisterUserUseCase],
  exports: [RegisterUserUseCase],
})
export class ApplicationModule {}
