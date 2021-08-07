import { Inject, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';

import { User } from '@domain/user/user.entity';
import { UpdateEntity } from '@application/common/update-entity';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { DBContext } from '@infra/prisma/db.context';
import { IMapper } from '@application/common/IMapper';
import { UserModel } from './user.model';
import { RegisterUserResponseModel } from '@application/user/models/response/register-user-response.model';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserEmail } from '@domain/user/user-email';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    private readonly _dbContext: DBContext,
    @Inject(UserMapperToken)
    private readonly _userMapper: IMapper<
      User,
      RegisterUserResponseModel,
      UserModel
    >,
  ) {}

  find(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }

  findOne(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async save(entity: User): Promise<boolean> {
    const model = this._userMapper.toPersistence(entity);

    const isCreated = await this._dbContext.user.create({
      data: model,
    });

    return !!isCreated;
  }

  updateOne(partialEntity: UpdateEntity<User>): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  deleteOne(id: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  async exists(email: UserEmail): Promise<boolean> {
    const alreadyExists = await this._dbContext.user.findFirst({
      where: {
        email: email.value,
      },
    });

    return !!alreadyExists;
  }

  generateId(): string {
    return v4();
  }
}
