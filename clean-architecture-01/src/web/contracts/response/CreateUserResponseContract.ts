import { CreateUserResponseModel } from '@/application/models/response/CreateUserResponseModel'
import { BaseResponseContract } from '@/web/common/BaseResponseContract'

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

  // Technically not from persistance?
  static from(persistance: CreateUserResponseModel) {
    return new CreateUserResponseContract(
      persistance.firstName,
      persistance.lastName
    )
  }
}
