import { Test } from '@nestjs/testing';
import { mocked } from 'ts-jest/utils';

import { IUserRepository } from '@application/interfaces/IUserRepository';
import { UserMapperToken } from '@application/tokens/user-mapper.token';
import { UserRepositoryToken } from '@application/tokens/user-repository.token';
import { Role } from '@domain/user/roles.enum';
import { UserEmail } from '@domain/user/user-email';
import { UserLocation } from '@domain/user/user-location';
import { User } from '@domain/user/user.entity';
import { DBContext } from '@infra/prisma/db.context';
import { DBService } from '@infra/prisma/db.service';
import { UserMapper } from '@infra/user/user.mapper';
import { UserModel } from '@infra/user/user.model';
import { UserRepository } from '@infra/user/user.repository';

// TODO: Fix tests setup

jest.mock('@infra/prisma/db.context', () => ({
  DBContext: jest.fn().mockImplementation(() => ({
    user: {
      findFirst: jest.fn().mockImplementation(async () => undefined),
    },
  })),
}));

jest.mock('@infra/user/user.mapper');

describe('user-repository', () => {
  let userRepo: IUserRepository;
  let dbContext: DBContext;
  let userMapper: UserMapper;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DBContext,
        DBService,
        {
          provide: UserRepositoryToken,
          useClass: UserRepository,
        },
        {
          provide: UserMapperToken,
          useClass: UserMapper,
        },
      ],
    }).compile();

    userRepo = moduleRef.get(UserRepositoryToken);
    dbContext = moduleRef.get(DBContext);
    userMapper = moduleRef.get(UserMapperToken);
  });

  test('should be defined', () => {
    expect(userRepo).toBeDefined();
  });

  describe('when finding a user by email', () => {
    test('then it should return null when no users found with given email', async () => {
      const result = await userRepo.findOneByEmail(
        UserEmail.create('email@email.com'),
      );

      expect(result).toBeNull();
    });

    test('then it should return a domain user entity back when found', async () => {
      mocked(userMapper.toDomain).mockReturnValueOnce(
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

      mocked(dbContext.user.findFirst).mockReturnValueOnce(
        new UserModel() as any,
      );

      const result = await userRepo.findOneByEmail(
        UserEmail.create('email@email.com'),
      );

      expect(userMapper.toDomain).toBeCalled();
      expect(result).toBeInstanceOf(User);
    });
  });

  describe('when invoking exists', () => {
    test('then it should return false when the user does not exist', async () => {
      mocked(dbContext.user.findFirst).mockReturnValueOnce(undefined);

      const result = await userRepo.findOneByEmail(
        UserEmail.create('test@mail.com'),
      );

      expect(result).toBeFalsy();
    });

    test.skip('then it should return true when the user exists', async () => {
      const model = new UserModel();

      const result = await userRepo.findOneByEmail(
        UserEmail.create('test@mail.com'),
      );

      expect(result).toBeTruthy();
    });
  });

  describe('when generating an id', () => {
    test('then it should return a stringified id', () => {
      const id = userRepo.generateId();

      expect(id).toBeDefined();
      expect(typeof id).toBe('string');
    });
  });
});
