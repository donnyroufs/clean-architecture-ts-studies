import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { RegisterUserUseCase } from '@application/user/usecases/register-user.usecase';
import { LoginUserUseCase } from '@application/user/usecases/login-user.usecase';
import { RegisterUserResponseContract } from './contracts/response/register-user-response.contract';
import { RegisterUserRequestContract } from './contracts/request/register-user-request.contract';
import { LoginUserRequestContract } from './contracts/request/login-user-request.contract';
import { LoginUserResponseContract } from './contracts/response/login-user-response.contract';
import { RegisterUserFilter } from './filters/register-user.filter';
import { LoginUserFilter } from './filters/login-user.filter';

@Controller('users')
export class UserController {
  constructor(
    private readonly _registerUserUseCase: RegisterUserUseCase,
    private readonly _loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('/register')
  @UseFilters(RegisterUserFilter)
  async register(@Body() body: RegisterUserRequestContract) {
    const result = await this._registerUserUseCase.execute(body);

    return new RegisterUserResponseContract(result);
  }

  @Post('/login')
  @UseFilters(LoginUserFilter)
  async login(@Body() body: LoginUserRequestContract) {
    const result = await this._loginUserUseCase.execute(body);

    return new LoginUserResponseContract(result);
  }
}
