import { Inject, Injectable } from '@nestjs/common';

import { User } from '@domain/user/user.entity';
import { UserEmail } from '@domain/user/user-email';
import { IHashService } from '@application/interfaces/IHashService';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { HashServiceToken } from '@application/tokens/hash-service.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { BadCredentialsException } from '@application/exceptions/bad-credentials.exception';
import { TokenServiceToken } from '@application/tokens/token-service.token';
import { ITokenService } from '@application/interfaces/ITokenService';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { IMapper } from '@application/common/IMapper';
import { IUserDto } from '@application/user/dtos/user.dto';
import { JWTClaims } from '@domain/user/jwt-claims';
import { UserToken } from '@domain/user/user-token';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UserRepositoryToken) private readonly _userRepo: IUserRepository,
    @Inject(HashServiceToken) private readonly _hashService: IHashService,
    @Inject(TokenServiceToken) private readonly _tokenService: ITokenService,
    @Inject(UserMapperToken)
    private readonly _userMapper: IMapper<User, IUserDto>,
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

  async getUserFromToken(token: string): Promise<IUserDto> {
    const claims = await this.getTokenClaims(token);
    const user = await this._userRepo.findOne(claims.id);

    user.setToken(UserToken.create({ value: token }));

    return this._userMapper.toDto(user);
  }

  async getTokenClaims(token: string): Promise<JWTClaims> {
    return this._tokenService.decode(token);
  }

  async hashPassword(password: string) {
    return this._hashService.hashPassword(password);
  }

  isValid(token: string): boolean {
    return this._tokenService.verify(token);
  }
}
