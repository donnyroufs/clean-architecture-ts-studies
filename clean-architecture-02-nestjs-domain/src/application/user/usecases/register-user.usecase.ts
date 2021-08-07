import { Inject, Injectable } from '@nestjs/common';

import { User } from '@domain/user/user.entity';
import { IMapper } from '@application/common/IMapper';
import { IUseCase } from '@application/common/IUseCase';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { RegisterUserRequestModel } from '@application/user/models/request/register-user-request.model';
import { RegisterUserResponseModel } from '@application/user/models/response/register-user-response.model';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';
import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';

@Injectable()
export class RegisterUserUseCase
  implements IUseCase<RegisterUserRequestModel, RegisterUserResponseModel>
{
  constructor(
    @Inject(UserRepositoryToken) private readonly _userRepo: IUserRepository,
    @Inject(UserMapperToken)
    private readonly _userMapper: IMapper<User, RegisterUserResponseModel>,
  ) {}

  async execute(
    model: RegisterUserRequestModel,
  ): Promise<RegisterUserResponseModel> {
    const generatedId = this._userRepo.generateId();
    const entity = this._userMapper.toDomain(model, generatedId);

    const exists = await this._userRepo.exists(entity.email);

    if (exists) {
      throw new EntityAlreadyExistsException('User');
    }

    const isSaved = await this._userRepo.save(entity);

    if (!isSaved) {
      throw new FailedToPersistEntityException('User');
    }

    return this._userMapper.toWorld(entity);
  }
}
