import { User } from '@prisma/client'
import { UserEntity } from '@Domain/entities/UserEntity'

export class PrismaUserModel implements User {
  id: string
  firstName: string
  lastName: string
  age: number

  static from(entity: UserEntity) {
    const model = new PrismaUserModel()

    model.id = entity.id
    model.firstName = entity.firstName
    model.lastName = entity.lastName
    model.age = entity.age

    return model
  }
}
