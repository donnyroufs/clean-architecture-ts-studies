import { Injectable } from '@kondah/core'

import { UserEntity } from '@Domain/entities/UserEntity'
import { UpdateEntity } from '@Application/common/UpdateEntity'
import { IUserRepository } from '@Application/common/interfaces/IUserRepository'
import { LocalDatabase } from '@Infra/drivers/local/LocalDatabase'
import { LocalUserModel } from '@Infra/drivers/local/models/LocalUserModel'

@Injectable()
export class LocalUserRepository implements IUserRepository {
  constructor(private readonly _database: LocalDatabase) {}

  find(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.')
  }

  findOne(id: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  async save(entity: UserEntity): Promise<boolean> {
    // Map to db model
    const model = LocalUserModel.from(entity)

    // Create user
    const isCreated = this._database.createOne(model)

    return isCreated
  }

  updateOne(partialEntity: UpdateEntity<UserEntity>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
