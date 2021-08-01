import { RegisterUserUseCase } from '@application/user/usecases/register-user.usecase';
import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '@webApi/user/user.controller';

describe.skip('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegisterUserUseCase],
      controllers: [UserController],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
