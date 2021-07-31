import { AuthenticateUserOutputPort } from '@Application/ports/output/AuthenticateUserOutputPort'
import { BaseResponseContract } from '@Web/common/BaseResponseContract'

export class AuthenticateUserResponseContract extends BaseResponseContract {
  constructor(public readonly token: string) {
    super()
  }

  static fromPort(port: AuthenticateUserOutputPort) {
    return new AuthenticateUserResponseContract(port.token)
  }
}
