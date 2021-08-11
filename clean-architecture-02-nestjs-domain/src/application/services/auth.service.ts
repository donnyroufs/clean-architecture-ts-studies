import { Inject, Injectable } from '@nestjs/common';

import { UserEmail } from '@domain/user/user-email';
import { IHashService } from '@application/interfaces/IHashService';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { HashServiceToken } from '@application/tokens/hash-service.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { BadCredentialsException } from '@application/exceptions/bad-credentials.exception';
import { TokenServiceToken } from '@application/tokens/token-service.token';
import { ITokenService } from '@application/interfaces/ITokenService';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositoryToken) private readonly _userRepo: IUserRepository,
    @Inject(HashServiceToken) private readonly _hashService: IHashService,
    @Inject(TokenServiceToken) private readonly _tokenService: ITokenService,
  ) {}

  async login(email: UserEmail, password: string): Promise<string | null> {
    const user = await this._userRepo.findOneByEmail(email);

    if (!user || !user.id) {
      return null;
    }

    const hasValidCredentials = await this._hashService.verify(
      password,
      user.password,
    );

    if (!hasValidCredentials) {
      throw new BadCredentialsException();
    }

    const token = await this._tokenService.create(user.id);

    return token;
  }

  async isAuthenticated(token: string): Promise<boolean> {
    return this._tokenService.verify(token);
  }
}
