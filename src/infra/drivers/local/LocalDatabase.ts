import { UserModel } from './models/UserModel'

export class LocalDatabase {
  private _users: UserModel[] = []

  constructor(users: UserModel[] = []) {
    this._users = users
  }

  findOne(id: string): UserModel | null {
    const foundUser = this._users.find((u) => u.id === id)

    if (!foundUser) {
      return null
    }

    return foundUser
  }
}
