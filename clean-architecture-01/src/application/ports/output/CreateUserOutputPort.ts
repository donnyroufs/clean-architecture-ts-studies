import { UserEntity } from '@Domain/entities/UserEntity'

export class CreateUserOutputPort {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly age: number
  ) {}

  static fromDomain(entity: UserEntity) {
    return new CreateUserOutputPort(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.age
    )
  }
}
