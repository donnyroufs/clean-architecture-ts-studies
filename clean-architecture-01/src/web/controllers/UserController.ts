import { Request, Response } from 'express'
import { Injectable } from '@kondah/core'

import { CreateUserUseCase } from '@Application/useCases/CreateUserUseCase'
import { CreateUserRequestContract } from '@Web/contracts/request/CreateUserRequestContract'
import { HttpResponse } from '@Web/common/HttpResponse'

@Injectable()
export class UserController {
  constructor(private readonly _createUserUseCase: CreateUserUseCase) {}

  async store(req: Request, res: Response) {
    // This should happen in a Interceptor (fancy word for middleware that does something specific)
    // Validate and map to request contract
    const createUserRequestContract = CreateUserRequestContract.from(req.body)

    // Map to a DTO that the application understands
    // TODO: We can use automapper here
    const createUserRequestModel = CreateUserRequestContract.toCore(
      createUserRequestContract
    )

    // Execute useCases and return us a HttpResponse
    const response = await this._createUserUseCase.execute<HttpResponse>(
      createUserRequestModel
    )

    res.status(response.statusCode)
    res.json(response.value)
  }
}
