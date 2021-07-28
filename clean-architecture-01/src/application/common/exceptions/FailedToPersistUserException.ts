export class FailedToPersistUserException extends Error {
  constructor() {
    super('Failed to persist the User.')
  }
}
