import { BaseEntity } from '@Domain/common/BaseEntity'

@Describe()
export class BaseEntitySpec {
  @Test()
  shouldAutoPopulateTheId() {
    const entity = new BaseEntity()

    expect(entity.id).toBeDefined()
  }
}
