import { IUserRepository } from '../../../../application/interfaces/IUserRepository'
import { LocalDatabase } from '../LocalDatabase'

export class UserRepository implements IUserRepository {
  constructor(private readonly _database: LocalDatabase) {}

  getUserMoney(id: string): number | null {
    const user = this._database.findOne(id)

    if (!user) {
      return null
    }

    return user.money
  }
}
