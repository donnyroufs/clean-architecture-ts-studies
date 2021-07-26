import { Request, Response } from 'express'

import { CreateUserUseCase } from '@/application/useCases/CreateUserUseCase'
import { Injectable } from '@kondah/core'
import { CreateUserRequestContract } from '../contracts/request/CreateUserRequestContract'
import { CreateUserResponseContract } from '../contracts/response/CreateUserResponseContract'

@Injectable()
export class UserController {
  constructor(private readonly _createUserUseCase: CreateUserUseCase) {}

  store(req: Request, res: Response) {
    // Validate and map to request contract
    const createUserRequestContract = CreateUserRequestContract.from(req.body)

    // Map to a dto that the application understands
    const createUserRequestModel = CreateUserRequestContract.toApplication(
      createUserRequestContract
    )

    // Execute useCase
    const result = this._createUserUseCase.execute(createUserRequestModel)

    // If there is an error we throw a *http* error
    if (result.isErr()) {
      throw new Error(result.error)
    }

    // Map to response contract
    const createUserResponseContract = CreateUserResponseContract.from(
      result.value
    )

    // Respond with our response contract
    res.json(createUserResponseContract.toJSON())
  }
}
