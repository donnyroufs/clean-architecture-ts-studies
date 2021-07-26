import { BaseEntity } from '../BaseEntity'
import { UpdateEntity } from '../UpdateEntity'

export interface IRepository<T extends BaseEntity> {
  find(): Promise<T[]>
  findOne(id: T['id']): Promise<T | null>
  save(entity: T): Promise<boolean>
  updateOne(partialEntity: UpdateEntity<T>): Promise<boolean>
  deleteOne(id: T['id']): Promise<boolean>
}
