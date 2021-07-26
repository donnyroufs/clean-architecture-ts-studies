import { Injectable } from '@kondah/core'
import { UserModel } from './models/UserModel'

@Injectable()
export class LocalDatabase {
  private _users: UserModel[] = []

  createOne(entity: UserModel): boolean {
    this._users.push(entity)

    return true
  }
}
