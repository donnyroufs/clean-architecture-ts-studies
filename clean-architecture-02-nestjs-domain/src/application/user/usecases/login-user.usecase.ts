import { Inject } from '@nestjs/common';

import { UserToken } from '@domain/user/user-token';
import { UserEmail } from '@domain/user/user-email';
import { User } from '@domain/user/user.entity';
import { IMapper } from '@application/common/IMapper';
import { IUseCase } from '@application/common/IUseCase';
import { NotAuthenticatedException } from '@application/exceptions/not-authenticated.exception';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { AuthService } from '@application/services/auth.service';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { ILoginUserDto } from '../dtos/login-user.dto';
import { IUserDto } from '../dtos/user.dto';

export class LoginUserUseCase implements IUseCase<ILoginUserDto, IUserDto> {
  constructor(
    private readonly _authService: AuthService,
    @Inject(UserMapperToken)
    private readonly _userMapper: IMapper<User, IUserDto>,
    @Inject(UserRepositoryToken) private readonly _userRepo: IUserRepository,
  ) {}

  async execute(model: ILoginUserDto): Promise<IUserDto> {
    const user = await this._userRepo.findOneByEmail(
      UserEmail.create(model.email),
    );

    if (!user) {
      throw new NotAuthenticatedException();
    }

    const token = await this._authService.login(user.email, model.password);

    user.setToken(
      UserToken.create({
        value: token,
      }),
    );

    return this._userMapper.toDto(user);
  }
}
