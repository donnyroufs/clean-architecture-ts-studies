import { Module } from '@nestjs/common';
import { CreatePostUseCase } from './post/usecases/create-post.usecase';
import { GetPostWithAuthorUseCase } from './post/usecases/get-post-with-author.usecase';
import { AuthService } from './services/auth.service';
import { LoginUserUseCase } from './user/usecases/login-user.usecase';
import { RegisterUserUseCase } from './user/usecases/register-user.usecase';

@Module({
  providers: [
    RegisterUserUseCase,
    AuthService,
    LoginUserUseCase,
    CreatePostUseCase,
    GetPostWithAuthorUseCase,
  ],
  exports: [
    RegisterUserUseCase,
    LoginUserUseCase,
    AuthService,
    CreatePostUseCase,
    GetPostWithAuthorUseCase,
  ],
})
export class ApplicationModule {}

export const ApplicationModuleImport = {
  global: true,
  module: ApplicationModule,
};
