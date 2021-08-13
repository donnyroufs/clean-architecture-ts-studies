import { BaseEntity } from '@domain/common/base-entity';

export interface IMapper<T extends BaseEntity<any>, O, P = unknown> {
  toPersistence(domain: T): P;
  toDomain(raw: any, id?: T['id']): T;
  toDto(domain: T): O;
}
