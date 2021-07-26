import { Utils } from '@Domain/common/Utils'

export class BaseEntity {
  public id = Utils.generateUniqueId()
}
