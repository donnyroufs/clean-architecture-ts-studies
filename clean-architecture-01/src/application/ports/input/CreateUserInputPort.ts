import { UserEntity } from '@Domain/entities/UserEntity'

export class CreateUserInputPort {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly age: number
  ) {}

  static toDomain(inputPort: CreateUserInputPort) {
    return UserEntity.create(
      inputPort.firstName,
      inputPort.lastName,
      inputPort.age
    )
  }
}
