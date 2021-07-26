import { Injectable } from '@kondah/core'
import { LocalUserModel } from './models/LocalUserModel'

@Injectable()
export class LocalDatabase {
  private _users: LocalUserModel[] = []

  createOne(entity: LocalUserModel): boolean {
    this._users.push(entity)

    return true
  }
}
