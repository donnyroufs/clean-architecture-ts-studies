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

@Controller('users')
export class UserController {
  constructor(private readonly _registerUserUseCase: RegisterUserUseCase) {}

  @Post('/register')
  async store(@Body() body: any) {
    return this._registerUserUseCase.execute(body).catch((err) => {
      if (err instanceof FailedToPersistEntityException) {
        throw new UnprocessableEntityException(err.message);
      }

      if (err instanceof EntityAlreadyExistsException) {
        throw new BadRequestException(err.message);
      }
    });
  }
}
