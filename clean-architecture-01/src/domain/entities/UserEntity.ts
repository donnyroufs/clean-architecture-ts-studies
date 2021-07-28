import { BaseEntity } from '@Domain/common/BaseEntity'
import { TwelveYearsOrOlderException } from '@Domain/common/exceptions/TwelveYearsOrOlderException'

export class UserEntity extends BaseEntity {
  firstName: string
  lastName: string
  age: number

  static create(firstName: string, lastName: string, age: number, id?: string) {
    const user = new UserEntity()

    user.firstName = firstName
    user.lastName = lastName

    if (age < 12) {
      throw new TwelveYearsOrOlderException()
    }

    user.age = age

    if (id) {
      user.id = id
    }

    return user
  }
}
