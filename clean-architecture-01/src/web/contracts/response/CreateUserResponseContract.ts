import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { BaseResponseContract } from '@Web/common/BaseResponseContract'

export class CreateUserResponseContract extends BaseResponseContract {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {
    super()
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  static from(outputPort: CreateUserOutputPort) {
    return new CreateUserResponseContract(
      outputPort.firstName,
      outputPort.lastName
    )
  }
}
