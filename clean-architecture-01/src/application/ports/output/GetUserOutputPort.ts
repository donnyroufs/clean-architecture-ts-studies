import { UserEntity } from '@Domain/entities/UserEntity'

export class GetUserOutputPort {
  constructor(
    public readonly id: string,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly age: number
  ) {}

  static fromDomain(entity: UserEntity): GetUserOutputPort {
    return new GetUserOutputPort(
      entity.id,
      entity.firstName,
      entity.lastName,
      entity.age
    )
  }
}
