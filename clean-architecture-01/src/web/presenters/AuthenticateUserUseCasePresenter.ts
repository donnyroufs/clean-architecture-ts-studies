import { Injectable } from '@kondah/core'

import { IPresenter } from '@Application/common/IPresenter'
import { AuthenticateUserOutputPort } from '@Application/ports/output/AuthenticateUserOutputPort'
import { HttpResponse } from '@Web/common/HttpResponse'
import { AuthenticateUserResponseContract } from '@Web/contracts/response/AuthenticateUserResponseContract'

@Injectable()
export class AuthenticateUserUseCasePresenter
  implements IPresenter<AuthenticateUserOutputPort>
{
  present(port: AuthenticateUserOutputPort) {
    return new HttpResponse(
      AuthenticateUserResponseContract.fromPort(port).toJSON()
    )
  }
}
