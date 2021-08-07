import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '@application/user/usecases/register-user.usecase';

@Controller('users')
export class UserController {
  constructor(private readonly _registerUserUseCase: RegisterUserUseCase) {}

  @Post('/register')
  async store(@Body() body: any) {
    const response = await this._registerUserUseCase.execute(body);

    return response;
  }
}
