import { Injectable } from '@kondah/core'
import { HttpError } from 'routing-controllers'

import { IPresenter } from '@Application/common/IPresenter'
import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { CreateUserResponseContract } from '@Web/contracts/response/CreateUserResponseContract'
import { HttpResponse } from '@Web/common/HttpResponse'
import { FailedToPersistUserException } from '@Application/common/exceptions/FailedToPersistUserException'

@Injectable()
export class CreateUserUseCasePresenter
  implements IPresenter<CreateUserOutputPort, FailedToPersistUserException>
{
  present(
    port: CreateUserOutputPort | FailedToPersistUserException
  ): HttpResponse<string> {
    if (port instanceof FailedToPersistUserException) {
      throw new HttpError(400, port.message)
    }

    return new HttpResponse(
      CreateUserResponseContract.fromPort(port).toJSON(),
      201
    )
  }
}
