import { Inject, Injectable } from '@nestjs/common';

import { User } from '@domain/user/user.entity';
import { IMapper } from '@application/common/IMapper';
import { IUseCase } from '@application/common/IUseCase';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';
import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';
import { AuthService } from '@application/services/auth.service';
import { IRegisterUserDto } from '../dtos/register-user.dto';
import { IUserDto } from '../dtos/user.dto';

@Injectable()
export class RegisterUserUseCase
  implements IUseCase<IRegisterUserDto, IUserDto>
{
  constructor(
    @Inject(UserRepositoryToken) private readonly _userRepo: IUserRepository,
    @Inject(UserMapperToken)
    private readonly _userMapper: IMapper<User, IUserDto>,
    private readonly _authService: AuthService,
  ) {}

  async execute(model: IRegisterUserDto): Promise<IUserDto> {
    const generatedId = this._userRepo.generateId();
    const entity = this._userMapper.toDomain(model, generatedId);

    const exists = await this._userRepo.exists(entity.email);

    if (exists) {
      throw new EntityAlreadyExistsException('User');
    }

    const hashedPassword = await this._authService.hashPassword(
      entity.password,
    );

    entity.setHashedPassword(hashedPassword);

    const isSaved = await this._userRepo.save(entity);

    if (!isSaved) {
      throw new FailedToPersistEntityException('User');
    }

    return this._userMapper.toDto(entity);
  }
}
