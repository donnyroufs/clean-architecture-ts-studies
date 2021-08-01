import { BaseEntity } from '@domain/common/base-entity';

export type UpdateEntity<T extends BaseEntity<any>> = Pick<T, 'id'> &
  Partial<Omit<T, 'id'>>;
