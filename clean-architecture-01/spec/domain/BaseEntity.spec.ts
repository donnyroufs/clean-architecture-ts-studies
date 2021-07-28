import { BaseEntity } from '@Domain/common/BaseEntity'

@Describe()
export class BaseEntitySpec {
  @Test()
  ShouldAutoPopulateTheId() {
    const entity = new BaseEntity()

    expect(entity.id).toBeDefined()
  }
}
