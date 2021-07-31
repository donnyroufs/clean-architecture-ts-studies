export class NotAuthenticatedException extends Error {
  constructor() {
    super('You are not authenticated')
  }
}
