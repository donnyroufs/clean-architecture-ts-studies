import { Injectable } from '@kondah/core'
import { HttpError } from 'routing-controllers'

import { IPresenter } from '@Application/common/IPresenter'
import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { CreateUserResponseContract } from '@Web/contracts/response/CreateUserResponseContract'
import { HttpResponse } from '@Web/common/HttpResponse'
import { FailedToPersistUserException } from '@Application/common/exceptions/FailedToPersistUserException'
import { ValidationException } from '@Application/common/exceptions/ValidationException'

@Injectable()
export class CreateUserUseCasePresenter
  implements IPresenter<CreateUserOutputPort>
{
  present(port: CreateUserOutputPort): HttpResponse<string> {
    if (port instanceof FailedToPersistUserException) {
      throw new HttpError(400, port.message)
    }

    if (port instanceof ValidationException) {
      throw new HttpError(422, port.message)
    }

    return new HttpResponse(
      CreateUserResponseContract.fromPort(port).toJSON(),
      201
    )
  }
}
