import { Inject, Injectable } from '@kondah/core'

import { IUseCase } from '@Domain/common/interfaces/IUseCase'
import { IUserRepository } from '@Application/common/interfaces/IUserRepository'
import { CreateUserInputPort } from '@Application/ports/input/CreateUserInputPort'
import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { IPresenter } from '@Application/common/IPresenter'
import { FailedToPersistUserException } from '@Application/common/exceptions/FailedToPersistUserException'
import { CreateUserUseCasePresenterToken } from '@Application/common/tokens/CreateUserUseCasePresenterToken'
import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'

@Injectable()
export class CreateUserUseCase implements IUseCase<CreateUserInputPort> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly _userRepository: IUserRepository,
    @Inject(CreateUserUseCasePresenterToken)
    private readonly _presenter: IPresenter<CreateUserInputPort>
  ) {}

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
