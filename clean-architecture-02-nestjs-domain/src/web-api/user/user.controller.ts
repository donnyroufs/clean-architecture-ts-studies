import {
  UnprocessableEntityException,
  Body,
  Controller,
  Post,
  BadRequestException,
  Get,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserUseCase } from '@application/user/usecases/register-user.usecase';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';
import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';
import { LoginUserUseCase } from '@application/user/usecases/login-user.usecase';
import { NotAuthenticatedException } from '@application/exceptions/not-authenticated.exception';
import { IUserDto } from '@application/user/dtos/user.dto';
import { User } from '@webApi/common/decorators/user.decorator';
import { IsAuthenticatedGuard } from '@webApi/common/guards/is-authenticated.guard';

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
    return this._loginUserUseCase.execute(body).catch((err) => {
      if (err instanceof NotAuthenticatedException) {
        // TOOD: Change exception
        throw new BadRequestException(err.message);
      }
    });
  }

  @Get('/test')
  @UseGuards(IsAuthenticatedGuard)
  async test(@User() user: IUserDto) {
    return user;
  }
}
