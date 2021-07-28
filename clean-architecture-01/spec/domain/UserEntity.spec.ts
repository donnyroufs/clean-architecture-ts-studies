import { TwelveYearsOrOlderException } from '@Domain/common/exceptions/TwelveYearsOrOlderException'
import { UserEntity } from '@Domain/entities/UserEntity'

@Describe()
export class UserEntitySpec {
  @Test()
  ShouldBeDefined() {
    const user = new UserEntity()

    expect(user).toBeDefined()
  }

  @Test()
  ShouldHaveAnIdWhenNotProvided() {
    const user = UserEntity.create('john', 'doe', 14)

    expect(user.id).toBeDefined()
  }

  @Test()
  ShouldThrowAnExceptionWhenYoungerThanTwelve() {
    expect(() => UserEntity.create('john', 'doe', 11)).toThrowError(
      TwelveYearsOrOlderException
    )

    expect(UserEntity.create('john', 'doe', 12)).toBeInstanceOf(UserEntity)
  }
}
