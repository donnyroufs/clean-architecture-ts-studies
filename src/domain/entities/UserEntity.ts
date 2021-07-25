import { BaseEntity } from '../common/BaseEntity'

export class UserEntity extends BaseEntity {
  public money = 0

  hasMoney() {
    return this.money > 0
  }
}
