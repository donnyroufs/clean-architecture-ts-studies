import { Injectable } from '@kondah/core'

import { LocalUserModel } from '@Infra/drivers/local/models/LocalUserModel'

@Injectable()
export class LocalDatabase {
  private _users: LocalUserModel[] = []

  createOne(entity: LocalUserModel): boolean {
    this._users.push(entity)

    return true
  }
}
