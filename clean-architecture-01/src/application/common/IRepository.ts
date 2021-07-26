import { BaseEntity } from '@Domain/common/BaseEntity'
import { UpdateEntity } from '@Application/common/UpdateEntity'

export interface IRepository<T extends BaseEntity> {
  find(): Promise<T[]>
  findOne(id: T['id']): Promise<T | null>
  save(entity: T): Promise<boolean>
  updateOne(partialEntity: UpdateEntity<T>): Promise<boolean>
  deleteOne(id: T['id']): Promise<boolean>
}
