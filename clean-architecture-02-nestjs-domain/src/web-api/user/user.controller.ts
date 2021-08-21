import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { RegisterUserUseCase } from '@application/user/usecases/register-user.usecase';
import { LoginUserUseCase } from '@application/user/usecases/login-user.usecase';
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
  async register(@Body() contract: RegisterUserRequestContract) {
    const result = await this._registerUserUseCase.execute(contract);

    return new RegisterUserResponseContract(result);
  }

  @Post('/login')
  async login(@Body() contract: LoginUserRequestContract) {
    const result = await this._loginUserUseCase.execute(contract);

    return new LoginUserResponseContract(result);
  }
}
