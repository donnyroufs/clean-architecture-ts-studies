import { UpdateEntity } from '@application/common/update-entity';
import { BaseEntity } from '@domain/common/base-entity';

interface IWrite<T extends BaseEntity<any>> {
  save(entity: T): Promise<boolean>;
  updateOne(partialEntity: UpdateEntity<T>): Promise<boolean>;
  deleteOne(id: T['id']): Promise<boolean>;
}

export interface IRead<T extends BaseEntity<any>> {
  find(): Promise<T[]>;
  findOne(id: T['id']): Promise<T | null>;
}

export interface IGenerateId<T = string> {
  generateId(): T;
}

export interface IRepository<T extends BaseEntity<any>>
  extends IRead<T>,
    IWrite<T>,
    IGenerateId<T['id']> {}
