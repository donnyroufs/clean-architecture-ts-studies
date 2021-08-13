import { mocked } from 'ts-jest/utils';
import { Test } from '@nestjs/testing';

import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { RegisterUserUseCase } from '@application/user/usecases/register-user.usecase';
import { RegisterUserRequestModel } from '@application/user/models/request/register-user-request.model';
import { UserMapper } from '@infra/user/user.mapper';
import { UserRepository } from '@infra/user/user.repository';
import { User } from '@domain/user/user.entity';
import { UserEmail } from '@domain/user/user-email';
import { UserLocation } from '@domain/user/user-location';
import { Role } from '@domain/user/roles.enum';
import { FailedToPersistEntityException } from '@application/exceptions/failed-to-persist-entity.exception';
import { EntityAlreadyExistsException } from '@application/exceptions/entity-already-exists.exception';
import { AuthService } from '@application/services/auth.service';
import { HashServiceToken } from '@application/tokens/hash-service.token';
import { HashService } from '@infra/implementations/hash.service';
import { TokenServiceToken } from '@application/tokens/token-service.token';
import { TokenService } from '@infra/implementations/token.service';

jest.mock('@infra/user/user.repository');
jest.mock('@infra/user/user.mapper');

describe('register-user-usecase', () => {
  let useCase: RegisterUserUseCase;
  let userRepo: UserRepository;
  let userMapper: UserMapper;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        RegisterUserUseCase,
        {
          provide: UserMapperToken,
          useClass: UserMapper,
        },
        {
          provide: UserRepositoryToken,
          useClass: UserRepository,
        },
        AuthService,
        {
          provide: HashServiceToken,
          useClass: HashService,
        },
        {
          provide: TokenServiceToken,
          useClass: TokenService,
        },
      ],
    }).compile();

    useCase = moduleRef.get(RegisterUserUseCase);
    userRepo = moduleRef.get<UserRepository>(UserRepositoryToken);
    userMapper = moduleRef.get<UserMapper>(UserMapperToken);

    mocked(userMapper).toDomain.mockReturnValue(
      User.create({
        email: UserEmail.create('user@mail.com'),
        location: UserLocation.create({
          city: 'London',
          country: 'England',
        }),
        password: 'secret',
        role: Role.USER,
      }),
    );

    mocked(userRepo.exists).mockReturnValue(new Promise((res) => res(false)));

    jest.restoreAllMocks();
  });

  test('should save the entity', async () => {
    mocked(userRepo).save.mockReturnValueOnce(new Promise((res) => res(true)));

    const model = new RegisterUserRequestModel('test@mail.com', 'asdasd', {
      city: 'London',
      country: 'England',
    });

    await useCase.execute(model);

    expect(userMapper.toDomain).toHaveBeenCalled();
    expect(mocked(userRepo.save).mock.calls[0][0]).toBeInstanceOf(User);
  });

  test('it should throw an exception ohen failed to save', async () => {
    mocked(userRepo).save.mockReturnValueOnce(new Promise((res) => res(false)));

    const model = new RegisterUserRequestModel('test@mail.com', 'asdasd', {
      city: 'London',
      country: 'England',
    });

    expect(async () => await useCase.execute(model)).rejects.toThrowError(
      FailedToPersistEntityException,
    );
  });

  test('it should return a mapped entity', async () => {
    mocked(userRepo).save.mockReturnValueOnce(new Promise((res) => res(true)));

    const model = new RegisterUserRequestModel('test@mail.com', 'asdasd', {
      city: 'London',
      country: 'England',
    });

    await useCase.execute(model);

    expect(userMapper.toWorld).toHaveBeenCalledWith(
      expect.objectContaining({ role: Role.USER }),
    );
  });

  test('it should throw an exception when the user already exists', async () => {
    mocked(userRepo.exists).mockReturnValueOnce(
      new Promise((res) => res(true)),
    );

    const model = new RegisterUserRequestModel('test@mail.com', 'asdasd', {
      city: 'London',
      country: 'England',
    });

    expect(async () => await useCase.execute(model)).rejects.toThrowError(
      EntityAlreadyExistsException,
    );
  });
});
