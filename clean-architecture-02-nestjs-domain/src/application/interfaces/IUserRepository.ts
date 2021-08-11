import { IRepository } from '@application/common/IRepository';
import { User } from '@domain/user/user.entity';

export interface IUserRepository extends IRepository<User> {
  findOneByEmail(email: User['email']): Promise<User | null>;
  exists(email: User['email']): Promise<boolean>;
}
