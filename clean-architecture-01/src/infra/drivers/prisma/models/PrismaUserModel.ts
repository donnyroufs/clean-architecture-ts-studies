// Can we extend the domain entity here? Or should the domain expose an interface, since a domain entity has business logic?

import { UserEntity } from '@/domain/entities/UserEntity'

export class PrismaUserModel {
  id: string
  firstName: string
  lastName: string

  static from(entity: UserEntity) {
    const model = new PrismaUserModel()

    model.id = entity.id
    model.firstName = entity.firstName
    model.lastName = entity.lastName

    return model
  }
}
