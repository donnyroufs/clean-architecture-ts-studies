import { UserEntity } from '@Domain/entities/UserEntity'

export class LocalUserModel {
  id: string
  firstName: string
  lastName: string

  static from(entity: UserEntity) {
    const model = new LocalUserModel()

    model.id = entity.id
    model.firstName = entity.firstName
    model.lastName = entity.lastName

    return model
  }
}
