import { Module } from '@nestjs/common';
import { CreatePostUseCase } from './post/usecases/create-post.usecase';
import { AuthService } from './services/auth.service';
import { LoginUserUseCase } from './user/usecases/login-user.usecase';
import { RegisterUserUseCase } from './user/usecases/register-user.usecase';

@Module({
  providers: [
    RegisterUserUseCase,
    AuthService,
    LoginUserUseCase,
    CreatePostUseCase,
  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    AuthService,
    CreatePostUseCase,
  ],
})
export class ApplicationModule {}

export const ApplicationModuleImport = {
  global: true,
  module: ApplicationModule,
};
