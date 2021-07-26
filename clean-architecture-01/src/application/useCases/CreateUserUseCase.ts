import { Inject, Injectable } from '@kondah/core'

import { IUseCase } from '@Domain/common/interfaces/IUseCase'
import {
  IUserRepository,
  IUserRepositoryToken,
} from '@Application/common/interfaces/IUserRepository'
import { CreateUserInputPort } from '@Application/ports/input/CreateUserInputPort'
import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { IPresenter } from '@Application/common/IPresenter'
import { FailedToPersistUserException } from '@Application/common/exceptions/FailedToPersistUserException'
import { CreateUserUseCasePresenterToken } from '@Application/common/tokens/CreateUserUseCasePresenterToken'

@Injectable()
export class CreateUserUseCase implements IUseCase<CreateUserInputPort> {
  constructor(
    @Inject(IUserRepositoryToken)
    private readonly _userRepository: IUserRepository,
    @Inject(CreateUserUseCasePresenterToken)
    private readonly _presenter: IPresenter<CreateUserInputPort>
  ) {}

  // Input Ports are technically Interfaces but I think classes are fine here
  // Because we are in TypeScript and maybe we need to add annotations later down the road.
  async execute<T = unknown>(request: CreateUserInputPort) {
    const entity = CreateUserInputPort.from(request)

    const saved = await this._userRepository.save(entity)

    if (!saved) {
      throw new FailedToPersistUserException()
    }

    // TODO: We can use an automapper here
    const createUserResponsePort = CreateUserOutputPort.from(entity)

    // TODO: Improve type support?
    return this._presenter.present(createUserResponsePort) as T
  }
}
