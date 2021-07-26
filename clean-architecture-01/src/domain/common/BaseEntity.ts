import { Utils } from './Utils'

export class BaseEntity {
  public id = Utils.generateUniqueId()
}
