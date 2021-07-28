import { IRepository } from '@Application/common/IRepository'
import { UpdateEntity } from '@Application/common/UpdateEntity'
import { UserEntity } from '@Domain/entities/UserEntity'
import { Injectable } from '@kondah/core'

@Injectable()
export class MockedUserRepo implements IRepository<UserEntity> {
  find(): Promise<UserEntity[]> {
    throw new Error('Method not implemented.')
  }
  findOne(id: string): Promise<UserEntity | null> {
    throw new Error('Method not implemented.')
  }
  async save(entity: UserEntity): Promise<boolean> {
    return true
  }
  updateOne(partialEntity: UpdateEntity<UserEntity>): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
