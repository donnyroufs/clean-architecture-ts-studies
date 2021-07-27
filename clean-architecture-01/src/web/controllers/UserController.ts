import { Body, HttpCode, Post } from 'routing-controllers'

import { CreateUserUseCase } from '@Application/useCases/CreateUserUseCase'
import { CreateUserRequestContract } from '@Web/contracts/request/CreateUserRequestContract'
import { HttpResponse } from '@Web/common/HttpResponse'
import { Controller } from '@Web/plugins/RestApiPlugin'

@Controller('/')
export class UserController {
  constructor(private readonly _createUserUseCase: CreateUserUseCase) {}

  @Post('/')
  @HttpCode(201)
  async store(@Body() contract: CreateUserRequestContract) {
    const response = await this._createUserUseCase.execute<HttpResponse>(
      CreateUserRequestContract.toInputPort(contract)
    )

    return response.value
  }
}
