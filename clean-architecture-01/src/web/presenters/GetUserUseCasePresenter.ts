import { NoUserFoundException } from '@Application/common/exceptions/NoUserFoundException'
import { ValidationException } from '@Application/common/exceptions/ValidationException'
import { IPresenter } from '@Application/common/IPresenter'
import { GetUserOutputPort } from '@Application/ports/output/GetUserOutputPort'
import { Injectable } from '@kondah/core'
import { HttpResponse } from '@Web/common/HttpResponse'
import { GetUserResponseContract } from '@Web/contracts/response/GetUserResponseContract'
import { HttpError } from 'routing-controllers'

@Injectable()
export class GetUserUseCasePresenter implements IPresenter<GetUserOutputPort> {
  present(port: GetUserOutputPort) {
    if (port instanceof NoUserFoundException) {
      throw new HttpError(404, port.message)
    }

    if (port instanceof ValidationException) {
      throw new HttpError(422, port.message)
    }

    return new HttpResponse(GetUserResponseContract.fromPort(port).toJSON())
  }
}
