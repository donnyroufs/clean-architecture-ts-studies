import { UserEntity } from '@Domain/entities/UserEntity'
import { IRepository } from '@Application/common/IRepository'

export interface IUserRepository extends IRepository<UserEntity> {
  findOneByFirstName(firstName: string): Promise<UserEntity | null>
}
