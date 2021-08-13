import {
  UnprocessableEntityException,
  Body,
  Controller,
  Post,
  BadRequestException,
} from '@nestjs/common';
import { RegisterUserUseCase } from '@application/user/usecases/register-user.usecase';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';
import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';
import { LoginUserUseCase } from '@application/user/usecases/login-user.usecase';
import { NotAuthenticatedException } from '@application/exceptions/not-authenticated.exception';

@Controller('users')
export class UserController {
  constructor(
    private readonly _registerUserUseCase: RegisterUserUseCase,
    private readonly _loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('/register')
  async register(@Body() body: any) {
    return this._registerUserUseCase.execute(body).catch((err) => {
      if (err instanceof FailedToPersistEntityException) {
        throw new UnprocessableEntityException(err.message);
      }

      if (err instanceof EntityAlreadyExistsException) {
        throw new BadRequestException(err.message);
      }
    });
  }

  @Post('/login')
  async login(@Body() body: any) {
    return this._loginUserUseCase.execute(body);
    // .catch((err) => {
    //   if (err instanceof NotAuthenticatedException) {
    //     // TOOD: Change exception
    //     throw new BadRequestException(err.message);
    //   }
    // });
  }
}
