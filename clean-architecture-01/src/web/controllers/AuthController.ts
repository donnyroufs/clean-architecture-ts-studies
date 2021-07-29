import { Body, Post } from 'routing-controllers'

import { AuthenticateUserUseCase } from '@Application/useCases/AuthenticateUserUseCase'
import { AuthenticateUserRequestContract } from '@Web/contracts/request/AuthenticateUserRequestContract'

import { Controller } from '@Web/plugins/RestApiPlugin'

@Controller('/auth')
export class AuthController {
  constructor(
    private readonly _authenticateUserUseCase: AuthenticateUserUseCase
  ) {}

  @Post('/login')
  async authenticate(@Body() body: AuthenticateUserRequestContract) {
    return this._authenticateUserUseCase.execute(
      AuthenticateUserRequestContract.toInputPort(body)
    )
  }
}
