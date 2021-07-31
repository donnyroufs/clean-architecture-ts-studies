import { Injectable } from '@kondah/core'

import { UserEntity } from '@Domain/entities/UserEntity'
import { UpdateEntity } from '@Application/common/UpdateEntity'
import { IUserRepository } from '@Application/common/interfaces/IUserRepository'
import { PrismaUserModel } from '@Infra/drivers/prisma/models/PrismaUserModel'
import { PrismaDatabase } from '@Infra/drivers/prisma/PrismaDatabase'
import { InvalidIdException } from '@Infra/common/exceptions/InvalidIdException'

@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly _database: PrismaDatabase) {}

  find(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.')
  }

  async findOne(id: string): Promise<UserEntity | null> {
    if (!this.isValidId(id)) {
      throw new InvalidIdException()
    }

    const foundUser = await this._database.user.findUnique({
      where: {
        id,
      },
    })

    if (!foundUser) {
      return null
    }

    return PrismaUserModel.toDomain(foundUser)
  }

  async findOneByFirstName(firstName: string): Promise<UserEntity | null> {
    // firstname is not unique therefore this will break the moment we have someone with the same name
    // but for this case-study I dont mind.
    const foundUser = await this._database.user.findFirst({
      where: {
        firstName,
      },
    })

    if (!foundUser) {
      return null
    }

    return PrismaUserModel.toDomain(foundUser)
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

  private isValidId(id: string) {
    return id.length === 32
  }
}
