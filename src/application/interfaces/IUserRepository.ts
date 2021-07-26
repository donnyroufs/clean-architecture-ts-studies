import { IRepository } from '@/domain/common/interfaces/IRepository'
import { UserEntity } from '@/domain/entities/UserEntity'

export const IUserRepositoryToken = Symbol('IUserRepositoryToken')

export interface IUserRepository extends IRepository<UserEntity> {}
