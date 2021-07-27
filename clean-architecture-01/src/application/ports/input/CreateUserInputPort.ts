import { UserEntity } from '@Domain/entities/UserEntity'

export class CreateUserInputPort {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string
  ) {}

  static toDomain(inputPort: CreateUserInputPort) {
    return UserEntity.create(inputPort.firstName, inputPort.lastName)
  }
}
