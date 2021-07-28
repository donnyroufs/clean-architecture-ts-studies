import { GetUserOutputPort } from '@Application/ports/output/GetUserOutputPort'
import { BaseResponseContract } from '@Web/common/BaseResponseContract'

export class GetUserResponseContract extends BaseResponseContract {
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

  static fromPort(outputPort: GetUserOutputPort) {
    return new GetUserResponseContract(
      outputPort.firstName,
      outputPort.lastName,
      outputPort.age
    )
  }
}
