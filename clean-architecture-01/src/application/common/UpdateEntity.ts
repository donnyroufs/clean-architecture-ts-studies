import { BaseEntity } from '@Domain/common/BaseEntity'

export type UpdateEntity<T extends BaseEntity> = Pick<T, 'id'> &
  Partial<Omit<T, 'id'>>
