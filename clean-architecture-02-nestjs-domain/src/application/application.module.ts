import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { RegisterUserUseCase } from './user/usecases/register-user.usecase';

@Module({
  providers: [RegisterUserUseCase, AuthService],
  exports: [RegisterUserUseCase],
})
export class ApplicationModule {}
