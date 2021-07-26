import { Result, err, ok } from '../../domain/common/Result'
import { IUseCase } from '../../domain/common/interfaces/IUseCase'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '../interfaces/IUserRepository'
import { UserEntity } from '@/domain/entities/UserEntity'
import { CreateUserRequestModel } from '../models/request/CreateUserRequestModel'
import { CreateUserResponseModel } from '../models/response/CreateUserResponseModel'
import { Inject, Injectable } from '@kondah/core'

@Injectable()
export class CreateUserUseCase
  implements IUseCase<CreateUserResponseModel, string>
{
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly _userRepository: IUserRepository
  ) {}

  async execute(
    createUser: CreateUserRequestModel
  ): Promise<Result<CreateUserResponseModel, string>> {
    // Map to entity which auto generates an ID for us
    const entity = UserEntity.create(createUser.firstName, createUser.lastName)

    // Persist the entity
    const saved = await this._userRepository.save(entity)

    if (!saved) {
      err('Could not create user')
    }

    return ok(new CreateUserResponseModel(entity.firstName, entity.lastName))
  }
}
