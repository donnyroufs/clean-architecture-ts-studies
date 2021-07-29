import { Injectable } from '@kondah/core'

import { IPresenter } from '@Application/common/IPresenter'
import { AuthenticateUserOutputPort } from '@Application/ports/output/AuthenticateUserOutputPort'

@Injectable()
export class AuthenticateUserUseCasePresenter
  implements IPresenter<AuthenticateUserOutputPort>
{
  present(port: AuthenticateUserOutputPort) {
    return port
  }
}
