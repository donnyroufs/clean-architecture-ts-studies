import { mocked } from 'ts-jest/utils';
import { Test } from '@nestjs/testing';

import { IHashService } from '@application/interfaces/IHashService';
import { ITokenService } from '@application/interfaces/ITokenService';
import { IUserRepository } from '@application/interfaces/IUserRepository';
import { AuthService } from '@application/services/auth.service';
import { HashServiceToken } from '@application/tokens/hash-service.token';
import { TokenServiceToken } from '@application/tokens/token-service.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { HashService } from '@infra/implementations/hash.service';
import { TokenService } from '@infra/implementations/token.service';
import { UserRepository } from '@infra/user/user.repository';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserMapper } from '@infra/user/user.mapper';
import { UserEmail } from '@domain/user/user-email';
import { Role } from '@domain/user/roles.enum';
import { User } from '@domain/user/user.entity';
import { UserLocation } from '@domain/user/user-location';

jest.mock('@infra/user/user.repository');
jest.mock('@infra/implementations/token.service');
jest.mock('@infra/implementations/hash.service');

describe('auth-service', () => {
  let authService: AuthService;
  let userRepo: IUserRepository;
  let hashService: IHashService;
  let tokenService: ITokenService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserRepositoryToken,
          useClass: UserRepository,
        },
        {
          provide: HashServiceToken,
          useClass: HashService,
        },
        {
          provide: TokenServiceToken,
          useClass: TokenService,
        },
        {
          provide: UserMapperToken,
          useClass: UserMapper,
        },
      ],
    }).compile();

    userRepo = moduleRef.get(UserRepositoryToken);
    hashService = moduleRef.get(HashServiceToken);
    tokenService = moduleRef.get(TokenServiceToken);

    authService = moduleRef.get(AuthService);

    mocked(userRepo.findOneByEmail).mockImplementation(async () =>
      User.create(
        {
          email: UserEmail.create('email@email.com'),
          location: UserLocation.create({
            city: 'London',
            country: 'England',
          }),
          password: 'password',
          role: Role.USER,
        },
        'id',
      ),
    );

    jest.restoreAllMocks();
  });

  test('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('when logging in a user', () => {
    test('then it should return null when it cannot find a user', async () => {
      mocked(userRepo.findOneByEmail).mockImplementationOnce(() => undefined);

      const result = await authService.login(
        UserEmail.create('email@email.com'),
        'password',
      );

      expect(userRepo.findOneByEmail).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    test('then it should return null when found user has no id', async () => {
      mocked(userRepo.findOneByEmail).mockImplementationOnce(async () =>
        User.create({
          email: UserEmail.create('email@email.com'),
          location: UserLocation.create({
            city: 'London',
            country: 'England',
          }),
          password: 'password',
          role: Role.USER,
        }),
      );

      const result = await authService.login(
        UserEmail.create('email@email.com'),
        'password',
      );

      expect(userRepo.findOneByEmail).toHaveBeenCalled();
      expect(result).toBeNull();
    });

    test('then it should verify the user credentials and throw an exception when incorrect', async () => {
      mocked(hashService.verify).mockImplementationOnce(async () => false);

      await expect(
        async () =>
          await authService.login(
            UserEmail.create('email@email.com'),
            'password',
          ),
      ).rejects.toThrow();

      expect(hashService.verify).toHaveBeenCalled();
    });

    test('then it should create and return a token', async () => {
      mocked(hashService.verify).mockImplementationOnce(async () => true);
      mocked(tokenService.create).mockImplementationOnce(() => 'token');

      const result = await authService.login(
        UserEmail.create('email@email.com'),
        'password',
      );

      expect(tokenService.create).toBeCalled();
      expect(result).toBe('token');
    });
  });
});
