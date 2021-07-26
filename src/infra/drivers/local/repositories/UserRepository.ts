import { UpdateEntity } from '@/domain/common/UpdateEntity'
import { UserEntity } from '@/domain/entities/UserEntity'
import { Injectable } from '@kondah/core'
import { IUserRepository } from '../../../../application/interfaces/IUserRepository'
import { LocalDatabase } from '../LocalDatabase'
import { UserModel } from '../models/UserModel'

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly _database: LocalDatabase) {}

  find(): UserEntity[] {
    throw new Error('Method not implemented.')
  }

  findOne(id: string): UserEntity | null {
    throw new Error('Method not implemented.')
  }

  save(entity: UserEntity): boolean {
    // Map to db model
    const model = UserModel.from(entity)

    // Create user
    const isCreated = this._database.createOne(model)

    return isCreated
  }

  updateOne(partialEntity: UpdateEntity<UserEntity>): boolean {
    throw new Error('Method not implemented.')
  }

  deleteOne(id: string): boolean {
    throw new Error('Method not implemented.')
  }
}
