import { Inject, Injectable } from '@kondah/core'

import { Result, err, ok } from '@Domain/common/Result'
import { UserEntity } from '@Domain/entities/UserEntity'
import { IUseCase } from '@Domain/common/interfaces/IUseCase'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@Application/common/interfaces/IUserRepository'
import { CreateUserRequestModel } from '@Application/models/request/CreateUserRequestModel'
import { CreateUserResponseModel } from '@Application/models/response/CreateUserResponseModel'

@Injectable()
export class CreateUserUseCase
  implements IUseCase<CreateUserRequestModel, CreateUserResponseModel>
{
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(
    request: CreateUserRequestModel
  ): Promise<Result<CreateUserRequestModel, string>> {
    const entity = UserEntity.create(request.firstName, request.lastName)

    const saved = await this._userRepository.save(entity)

    if (!saved) {
      err('Could not create user')
    }

    return ok(CreateUserResponseModel.from(entity))
  }
}
