import { Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { User } from '@domain/user/user.entity';
import { UpdateEntity } from '@application/common/update-entity';
import { IUserRepository } from '@application/interfaces/IUserRepository';

@Injectable()
export class UserRepository implements IUserRepository {
  find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  // TODO: Implement
  async save(entity: User): Promise<boolean> {
    return true;
  }

  updateOne(partialEntity: UpdateEntity<User>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  generateId(): string {
    return v4();
  }
}
