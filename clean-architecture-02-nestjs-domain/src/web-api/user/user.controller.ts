import {
  UnprocessableEntityException,
  Body,
  Controller,
  Post,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { RegisterUserUseCase } from '@application/user/usecases/register-user.usecase';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';
import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';
import { LoginUserUseCase } from '@application/user/usecases/login-user.usecase';
import { NotAuthenticatedException } from '@application/exceptions/not-authenticated.exception';
import { IUserDto } from '@application/user/dtos/user.dto';
import { RegisterUserResponseContract } from './contracts/response/register-user-response.contract';
import { RegisterUserRequestContract } from './contracts/request/register-user-request.contract';
import { LoginUserRequestContract } from './contracts/request/login-user-request.contract';
import { LoginUserResponseContract } from './contracts/response/login-user-response.contract';

@Controller('users')
export class UserController {
  constructor(
    private readonly _registerUserUseCase: RegisterUserUseCase,
    private readonly _loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('/register')
  async register(@Body() body: RegisterUserRequestContract) {
    const result = await this._registerUserUseCase
      .execute(body)
      .catch((err) => {
        if (err instanceof FailedToPersistEntityException) {
          throw new UnprocessableEntityException(err.message);
        }

        if (err instanceof EntityAlreadyExistsException) {
          throw new BadRequestException(err.message);
        }
      });

    return new RegisterUserResponseContract(result as IUserDto);
  }

  @Post('/login')
  @UseInterceptors(ClassSerializerInterceptor)
  async login(@Body() body: LoginUserRequestContract) {
    const result = await this._loginUserUseCase.execute(body).catch((err) => {
      if (err instanceof NotAuthenticatedException) {
        // TOOD: Change exception
        throw new BadRequestException(err.message);
      }
    });

    return new LoginUserResponseContract(result as IUserDto).toJSON();
  }
}
