import { Inject } from '@nestjs/common';

import { UserEmail } from '@domain/user/user-email';
import { User } from '@domain/user/user.entity';
import { IMapper } from '@application/common/IMapper';
import { IUseCase } from '@application/common/IUseCase';
import { NotAuthenticatedException } from '@application/exceptions/not-authenticated.exception';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { AuthService } from '@application/services/auth.service';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { LoginUserRequestModel } from '@application/user/models/request/login-user-request.model';
import { LoginUserResponseModel } from '@application/user/models/response/login-user-response.model';
import { RegisterUserResponseModel } from '@application/user/models/response/register-user-response.model';

export class LoginUserUseCase
  implements IUseCase<LoginUserRequestModel, LoginUserResponseModel>
{
  constructor(
    private readonly _authService: AuthService,
    @Inject(UserMapperToken)
    private readonly _userMapper: IMapper<User, RegisterUserResponseModel>,
    @Inject(UserRepositoryToken) private readonly _userRepo: IUserRepository,
  ) {}

  async execute(model: LoginUserRequestModel): Promise<LoginUserResponseModel> {
    const user = await this._userRepo.findOneByEmail(
      UserEmail.create(model.email),
    );

    if (!user) {
      throw new NotAuthenticatedException();
    }

    const token = await this._authService.login(user.email, model.password);

    // TODO: Move to mapper
    const response = new LoginUserResponseModel();

    response.id = user.id!;
    response.location = user.location;
    response.role = user.role;
    response.token = token;
    response.email = user.email.value;

    return response;
  }
}
