import { UserEntity } from '@Domain/entities/UserEntity'

@Describe()
export class UserEntitySpec {
  @Test()
  shouldBeDefined() {
    const user = new UserEntity()

    expect(user).toBeDefined()
  }

  @Test()
  shouldHaveAnIdWhenNotProvided() {
    const user = UserEntity.create('john', 'doe')

    expect(user.id).toBeDefined()
  }
}
