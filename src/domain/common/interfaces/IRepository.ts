import { BaseEntity } from '../BaseEntity'
import { UpdateEntity } from '../UpdateEntity'

export interface IRepository<T extends BaseEntity> {
  find(): T[]
  findOne(id: T['id']): T | null
  save(entity: T): boolean
  updateOne(partialEntity: UpdateEntity<T>): boolean
  deleteOne(id: T['id']): boolean
}
