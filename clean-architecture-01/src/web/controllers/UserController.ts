import {
  Body,
  Get,
  HeaderParam,
  HttpCode,
  Param,
  Post,
} from 'routing-controllers'

import { CreateUserUseCase } from '@Application/useCases/CreateUserUseCase'
import { CreateUserRequestContract } from '@Web/contracts/request/CreateUserRequestContract'
import { HttpResponse } from '@Web/common/HttpResponse'
import { Controller } from '@Web/plugins/RestApiPlugin'
import { GetUserUseCase } from '@Application/useCases/GetUserUseCase'

@Controller('/users')
export class UserController {
  constructor(
    private readonly _createUserUseCase: CreateUserUseCase,
    private readonly _getUserUseCase: GetUserUseCase
  ) {}

  @Get('/:id')
  @HttpCode(200)
  async findOne(
    @Param('id') id: string,
    @HeaderParam('Authorization') token: string
  ) {
    const parsedToken = token.split(' ')[1]
    const response = await this._getUserUseCase.execute<HttpResponse>({
      id,
      token: parsedToken,
    })

    return response.value
  }

  @Post('/')
  @HttpCode(201)
  async store(@Body() contract: CreateUserRequestContract) {
    const response = await this._createUserUseCase.execute<HttpResponse>(
      CreateUserRequestContract.toInputPort(contract)
    )

    return response.value
  }
}
