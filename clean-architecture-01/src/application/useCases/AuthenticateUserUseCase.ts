import { Inject, Injectable } from '@kondah/core'

import { IUseCase } from '@Domain/common/interfaces/IUseCase'
import { AuthenticateUserInputPort } from '@Application/ports/input/AuthenticateUserInputPort'
import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'
import { IPresenter } from '@Application/common/IPresenter'
import { AuthenticateUserUseCasePresenterToken } from '@Application/common/tokens/AuthenticateUserUseCasePresenterToken'
import { AuthService } from '@Application/services/AuthService'
import { AuthenticateUserOutputPort } from '@Application/ports/output/AuthenticateUserOutputPort'
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
    try {
      const token = await this._authService.login(
        request.firstName,
        request.password
      )

      return this._presenter.present(new AuthenticateUserOutputPort(token))
    } catch (err) {
      return this._presenter.present(new NotAuthenticatedException())
    }
  }
}
