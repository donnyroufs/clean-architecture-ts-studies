import { Inject, Injectable } from '@nestjs/common';

import { User } from '@domain/user/user.entity';
import { IMapper } from '@application/common/IMapper';
import { IUseCase } from '@application/common/IUseCase';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { RegisterUserRequestModel } from '@application/user/models/request/register-user-request.model';
import { RegisterUserResponseModel } from '@application/user/models/response/register-user-response.model';

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
    const entity = User.create(this._userMapper.toDomain(model), generatedId);

    const isSaved = await this._userRepo.save(entity);

    if (!isSaved) {
      // TODO: Impl exception
      throw new Error('Could not save User Entity');
    }

    return this._userMapper.toWorld(entity);
  }
}
