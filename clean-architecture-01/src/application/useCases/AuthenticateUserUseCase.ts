import { Inject, Injectable } from '@kondah/core'

import { IUseCase } from '@Domain/common/interfaces/IUseCase'
import { AuthenticateUserInputPort } from '@Application/ports/input/AuthenticateUserInputPort'
import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'
import { IPresenter } from '@Application/common/IPresenter'
import { AuthenticateUserUseCasePresenterToken } from '@Application/common/tokens/AuthenticateUserUseCasePresenterToken'
import { AuthService } from '@Application/services/AuthService'
import { NotAuthenticatedException } from '@Application/common/exceptions/NotAuthenticatedException'

@Injectable()
export class AuthenticateUserUseCase
  implements IUseCase<AuthenticateUserInputPort>
{
  constructor(
    @Inject(UserRepositoryToken)
    private readonly _authService: AuthService,
    @Inject(AuthenticateUserUseCasePresenterToken)
    private readonly _presenter: IPresenter<unknown>
  ) {}

  async execute<T = unknown>(request: AuthenticateUserInputPort): Promise<T> {
    const hasValidCredentionals = await this._authService.hasValidCredentials(
      request.firstName,
      request.password
    )

    if (!hasValidCredentionals) {
      throw new NotAuthenticatedException()
    }

    // TODO: Create a JWT & send a long in the request?
    // Or do we let the outer layer decide on how they want to authenticate a user?

    return this._presenter.present(request)
  }
}
