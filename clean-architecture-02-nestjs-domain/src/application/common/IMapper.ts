import { BaseEntity } from '@domain/common/base-entity';

export interface IMapper<T extends BaseEntity<any>, O, P = unknown> {
  toPersistence(domain: T): P;
  toDomain(model: any, id?: T['id']): T;
  toWorld(domain: T): O;
}
