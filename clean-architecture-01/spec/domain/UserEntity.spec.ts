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
    const user = UserEntity.create('john', 'doe')

    expect(user.id).toBeDefined()
  }
}
