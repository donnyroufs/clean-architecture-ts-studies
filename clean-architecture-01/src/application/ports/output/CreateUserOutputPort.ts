import { UserEntity } from '@Domain/entities/UserEntity'

export class CreateUserOutputPort {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly age: number
  ) {}

  static fromDomain(entity: UserEntity) {
    return new CreateUserOutputPort(
      entity.firstName,
      entity.lastName,
      entity.age
    )
  }
}
