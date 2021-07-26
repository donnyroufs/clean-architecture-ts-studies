import { IUserRepository } from '@/application/interfaces/IUserRepository'
import { UpdateEntity } from '@/domain/common/UpdateEntity'
import { UserEntity } from '@/domain/entities/UserEntity'
import { Injectable } from '@kondah/core'
import { PrismaUserModel } from '../models/PrismaUserModel'
import { PrismaDatabase } from '../PrismaDatabase'

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly _database: PrismaDatabase) {}

  find(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.')
  }

  findOne(id: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }

  async save(entity: UserEntity): Promise<boolean> {
    const userModel = PrismaUserModel.from(entity)

    const created = await this._database.user.create({
      data: {
        ...userModel,
      },
    })

    return !!created
  }

  updateOne(partialEntity: UpdateEntity<UserEntity>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }

  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
