import { UserEntity } from '@Domain/entities/UserEntity'

export class CreateUserInputPort {
  constructor(
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly age: number,
    public readonly password: string
  ) {}

  static toDomain(inputPort: CreateUserInputPort) {
    const entity = UserEntity.create(
      inputPort.firstName,
      inputPort.lastName,
      inputPort.age
    )

    entity.attachPassword(inputPort.password)

    return entity
  }
}
