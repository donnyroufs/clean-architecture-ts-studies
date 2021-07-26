import { CoreException } from '@Domain/common/CoreException'

export class FailedToPersistUserException extends CoreException {
  constructor() {
    super('Failed to persist the User.')
  }
}
