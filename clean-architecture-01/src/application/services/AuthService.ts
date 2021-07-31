import { Inject, Injectable } from '@kondah/core'
import jwt from 'jsonwebtoken'

import { NoUserFoundException } from '@Application/common/exceptions/NoUserFoundException'
import { IHasherService } from '@Application/common/interfaces/IHasherService'
import { IUserRepository } from '@Application/common/interfaces/IUserRepository'
import { HasherServiceToken } from '@Application/common/tokens/HasherServiceToken'
import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'
import { NotAuthenticatedException } from '@Application/common/exceptions/NotAuthenticatedException'
import { UserEntity } from '@Domain/entities/UserEntity'
import { TokenStoreToken } from '@Application/common/tokens/TokenStoreToken'
import { ITokenStore } from '@Application/common/interfaces/ITokenStore'

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositoryToken)
    private readonly _userRepository: IUserRepository,
    @Inject(HasherServiceToken) private readonly _hasherService: IHasherService,
    @Inject(TokenStoreToken) private readonly _tokenStore: ITokenStore
  ) {}

  async canAccessResource(id: string, token: string) {
    const storedToken = await this._tokenStore.getToken(id)

    const isValidToken = jwt.verify(token, process.env.JWT_SECRET)

    if (!isValidToken || storedToken !== token) {
      return false
    }

    return true
  }

  async login(firstName: string, password: string) {
    const user = await this._userRepository.findOneByFirstName(firstName)

    if (!user) {
      throw new NoUserFoundException('')
    }

    const hasValidCredentials = this.hasValidCredentials(user, password)

    if (!hasValidCredentials) {
      throw new NotAuthenticatedException()
    }

    const token = this.generateToken(user.id)

    await this._tokenStore.saveToken(user.id, token)

    return token
  }

  async hasValidCredentials(
    user: UserEntity,
    password: string
  ): Promise<boolean> {
    return this._hasherService.isValidPassword(user.password!, password)
  }

  hashPassword(password: string) {
    return this._hasherService.hashPassword(password)
  }

  generateToken(userId: string) {
    // TODO: Could create a configuration class that exposes the environment variables
    return jwt.sign({ userId }, process.env.JWT_SECRET)
  }
}
