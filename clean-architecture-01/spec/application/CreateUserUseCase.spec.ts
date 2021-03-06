import { Energizor } from '@kondah/core'
import { FailedToPersistUserException } from '@Application/common/exceptions/FailedToPersistUserException'
import { CreateUserUseCasePresenterToken } from '@Application/common/tokens/CreateUserUseCasePresenterToken'
import { UserRepositoryToken } from '@Application/common/tokens/UserRepositoryToken'
import { CreateUserInputPort } from '@Application/ports/input/CreateUserInputPort'
import { CreateUserOutputPort } from '@Application/ports/output/CreateUserOutputPort'
import { CreateUserUseCase } from '@Application/useCases/CreateUserUseCase'
import { UserEntity } from '@Domain/entities/UserEntity'
import { TestableApp } from './fixtures/utils/TestableApp'
import { MockedUserRepo } from './fixtures/mocks/MockedUserRepo'
import { MockedCreateUserPresenter } from './fixtures/mocks/MockedCreateUserPresenter'
import { ValidationException } from '@Application/common/exceptions/ValidationException'

@Describe()
export class CreateUserUseCaseSpec {
  app: TestableApp
  energizor: Energizor

  @BeforeAll()
  setup() {
    const { app, energizor } = TestableApp.create()

    this.app = app
    this.energizor = energizor

    this.energizor.register(UserRepositoryToken, {
      asClass: MockedUserRepo,
    })

    this.energizor.register(CreateUserUseCasePresenterToken, {
      asClass: MockedCreateUserPresenter,
    })

    this.energizor.register(CreateUserUseCase)
  }

  @Test()
  async ShouldBeDefined() {
    const useCase = this.energizor.get(CreateUserUseCase)

    expect(useCase).toBeDefined()
  }

  @Test()
  async ItShouldMapTheInputPortToADomainEntity() {
    MockedUserRepo.prototype.save = jest.fn().mockReturnValue(true)

    const useCase = this.energizor.get(CreateUserUseCase)
    const spy = jest.spyOn(MockedUserRepo.prototype, 'save')

    await useCase.execute(new CreateUserInputPort('john', 'doe', 14, 'asdasd'))

    expect(spy.mock.calls[0][0]).toBeInstanceOf(UserEntity)
  }

  @Test()
  async ItShouldReturnAFailedToPersistUserExceptionWhenFailedToSaveUserEntity() {
    MockedUserRepo.prototype.save = jest.fn().mockReturnValue(false)

    const useCase = this.energizor.get(CreateUserUseCase)

    const r = await useCase.execute(
      new CreateUserInputPort('john', 'doe', 14, 'asdasd')
    )

    expect(r).toBeInstanceOf(FailedToPersistUserException)
  }

  @Test()
  async ItShouldReturnTheCreateUserOutputPortWhenSuccesfullyCreatedUser() {
    MockedUserRepo.prototype.save = jest.fn().mockReturnValue(true)

    const useCase = this.energizor.get(CreateUserUseCase)

    const result = await useCase.execute(
      new CreateUserInputPort('john', 'doe', 14, 'asdasd')
    )

    expect(result).toBeInstanceOf(CreateUserOutputPort)
  }

  @Test()
  async ItShouldThrowAValidationErrorWhenUserValidationFailed() {
    const useCase = this.energizor.get(CreateUserUseCase)

    const result = await useCase.execute(
      new CreateUserInputPort('john', 'doe', 11, 'asdasd')
    )

    expect(result).toBeInstanceOf(ValidationException)
  }
}
