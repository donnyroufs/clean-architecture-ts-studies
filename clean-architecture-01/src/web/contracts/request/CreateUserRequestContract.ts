import { CreateUserRequestModel } from '@Application/models/request/CreateUserRequestModel'

export class CreateUserRequestContract {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {}

  /**
   * Validates Network request and makes sure it's properly mapped
   */
  static from(body: Partial<CreateUserRequestContract>) {
    if (!body.firstName) {
      throw new Error('missing firstName')
    }

    if (!body.lastName) {
      throw new Error('missing lastName')
    }

    return new CreateUserRequestContract(body.firstName, body.lastName)
  }

  static toApplication(createUserRequestContract: CreateUserRequestContract) {
    return new CreateUserRequestModel(
      createUserRequestContract.firstName,
      createUserRequestContract.lastName
    )
  }
}
