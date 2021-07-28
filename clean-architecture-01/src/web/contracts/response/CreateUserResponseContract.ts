import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { BaseResponseContract } from '@Web/common/BaseResponseContract'

export class CreateUserResponseContract extends BaseResponseContract {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly age: number
  ) {
    super()
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  get isOlderThanTwelve() {
    return this.age >= 12
  }

  static fromPort(outputPort: CreateUserOutputPort) {
    return new CreateUserResponseContract(
      outputPort.firstName,
      outputPort.lastName,
      outputPort.age
    )
  }
}
