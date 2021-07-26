import { UserEntity } from '@Domain/entities/UserEntity'

export class CreateUserResponseModel {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {}

  static from(entity: UserEntity) {
    return new CreateUserResponseModel(entity.firstName, entity.lastName)
  }
}
