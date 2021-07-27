import { BaseEntity } from '@Domain/common/BaseEntity'

export class UserEntity extends BaseEntity {
  firstName: string
  lastName: string

  static create(firstName: string, lastName: string, id?: string) {
    const user = new UserEntity()

    user.firstName = firstName
    user.lastName = lastName

    if (id) {
      user.id = id
    }

    // TODO: Do business logic here

    return user
  }

  // Behaviours (Create a post, Delete a post etc.)
}
