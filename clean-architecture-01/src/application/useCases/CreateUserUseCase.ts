import { Inject, Injectable } from '@kondah/core'

import { IUseCase } from '@Domain/common/interfaces/IUseCase'
import { IUserRepository } from '@Application/common/interfaces/IUserRepository'
import { CreateUserInputPort } from '@Application/ports/input/CreateUserInputPort'
import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { IPresenter } from '@Application/common/IPresenter'
import { FailedToPersistUserException } from '@Application/common/exceptions/FailedToPersistUserException'
import { CreateUserUseCasePresenterToken } from '@Application/common/tokens/CreateUserUseCasePresenterToken'
import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'
import { ValidationException } from '@Application/common/exceptions/ValidationException'

@Injectable()
export class CreateUserUseCase implements IUseCase<CreateUserInputPort> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly _userRepository: IUserRepository,
    @Inject(CreateUserUseCasePresenterToken)
    private readonly _presenter: IPresenter<CreateUserInputPort>
  ) {}

  async execute<T = unknown>(request: CreateUserInputPort): Promise<T> {
    try {
      const entity = CreateUserInputPort.toDomain(request)
      const saved = await this._userRepository.save(entity)

      if (!saved) {
        return this._presenter.present(new FailedToPersistUserException())
      }

      return this._presenter.present(CreateUserOutputPort.fromDomain(entity))
    } catch (err) {
      return this._presenter.present(new ValidationException(err.message))
    }
  }
}
