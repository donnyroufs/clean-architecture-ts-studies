import { Body, HttpCode, Post } from 'routing-controllers'

import { AuthenticateUserUseCase } from '@Application/useCases/AuthenticateUserUseCase'
import { AuthenticateUserRequestContract } from '@Web/contracts/request/AuthenticateUserRequestContract'

import { Controller } from '@Web/plugins/RestApiPlugin'
import { HttpResponse } from '@Web/common/HttpResponse'

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly _authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  @Post('/login')
  @HttpCode(201)
  async authenticate(@Body() body: AuthenticateUserRequestContract) {
    const response = await this._authenticateUserUseCase.execute<HttpResponse>(
      AuthenticateUserRequestContract.toInputPort(body)
    )

    return response.value
  }
}
