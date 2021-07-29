import { Inject, Injectable } from '@kondah/core'
import { NoUserFoundException } from '@Application/common/exceptions/NoUserFoundException'
import { IHasherService } from '@Application/common/interfaces/IHasherService'
import { IUserRepository } from '@Application/common/interfaces/IUserRepository'
import { HasherServiceToken } from '@Application/common/tokens/HasherServiceToken'
import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly _userRepository: IUserRepository,
    @Inject(HasherServiceToken) private readonly _hasherService: IHasherService
  ) {}

  async hasValidCredentials(
    firstName: string,
    password: string
  ): Promise<boolean> {
    const user = await this._userRepository.findOneByFirstName(firstName)

    if (!user) {
      // TODO: Fix
      throw new NoUserFoundException('')
    }

    return this._hasherService.isValidPassword(user.password!, password)
  }

  hashPassword(password: string) {
    return this._hasherService.hashPassword(password)
  }
}
