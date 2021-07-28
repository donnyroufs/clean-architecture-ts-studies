import { Injectable } from '@kondah/core'

import { UserEntity } from '@Domain/entities/UserEntity'
import { UpdateEntity } from '@Application/common/UpdateEntity'
import { IUserRepository } from '@Application/common/interfaces/IUserRepository'
import { PrismaUserModel } from '@Infra/drivers/prisma/models/PrismaUserModel'
import { PrismaDatabase } from '@Infra/drivers/prisma/PrismaDatabase'

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
      data: userModel,
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
