import { User } from '@prisma/client'
import { UserEntity } from '@Domain/entities/UserEntity'
import { MissingPasswordException } from '@Infra/common/exceptions/MissingPasswordException'

export class PrismaUserModel implements User {
  id: string
  firstName: string
  lastName: string
  age: number
  password: string

  static from(entity: UserEntity) {
    const model = new PrismaUserModel()

    model.id = entity.id
    model.firstName = entity.firstName
    model.lastName = entity.lastName
    model.age = entity.age

    if (!entity.password) {
      throw new MissingPasswordException()
    }

    model.password = entity.password

    return model
  }

  static toDomain(model: PrismaUserModel) {
    const entity = UserEntity.create(
      model.firstName,
      model.lastName,
      model.age,
      model.id
    )

    entity.attachPassword(model.password)

    return entity
  }
}
