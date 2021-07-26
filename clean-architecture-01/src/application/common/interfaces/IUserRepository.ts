import { UserEntity } from '@Domain/entities/UserEntity'
import { IRepository } from '@Application/common/IRepository'

export const IUserRepositoryToken = Symbol('IUserRepositoryToken')

export interface IUserRepository extends IRepository<UserEntity> {}
