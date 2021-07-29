import { Inject, Injectable } from '@kondah/core'

import { IUseCase } from '@Domain/common/interfaces/IUseCase'
import { NoUserFoundException } from '@Application/common/exceptions/NoUserFoundException'
import { ValidationException } from '@Application/common/exceptions/ValidationException'
import { IUserRepository } from '@Application/common/interfaces/IUserRepository'
import { IPresenter } from '@Application/common/IPresenter'
import { GetUserUseCasePresenterToken } from '@Application/common/tokens/GetUserUseCasePresenterToken'
import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'
import { GetUserInputPort } from '@Application/ports/input/GetUserInputPort'
import { GetUserOutputPort } from '@Application/ports/output/GetUserOutputPort'

@Injectable()
export class GetUserUseCase implements IUseCase<GetUserInputPort> {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly _userRepository: IUserRepository,
    @Inject(GetUserUseCasePresenterToken)
    private readonly _presenter: IPresenter<GetUserInputPort>
  ) {}
  async execute<T = unknown>(request: GetUserInputPort): Promise<T> {
    const entity = await this._userRepository
      .findOne(request.id)
      .catch((err) => {
        return this._presenter.present(new ValidationException(err.message))
      })

    if (!entity) {
      return this._presenter.present(new NoUserFoundException(request.id))
    }

    return this._presenter.present(GetUserOutputPort.fromDomain(entity))
  }
}
