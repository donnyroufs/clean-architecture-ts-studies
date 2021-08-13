import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { LoginUserUseCase } from './user/usecases/login-user.usecase';
import { RegisterUserUseCase } from './user/usecases/register-user.usecase';

@Module({
  providers: [RegisterUserUseCase, AuthService, LoginUserUseCase],
  exports: [RegisterUserUseCase, LoginUserUseCase, AuthService],
})
export class ApplicationModule {}
