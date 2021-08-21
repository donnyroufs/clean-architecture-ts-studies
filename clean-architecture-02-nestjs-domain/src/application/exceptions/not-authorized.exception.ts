export class NotAuthorizedException extends Error {
  constructor() {
    super('You do not have permissions');
  }
}
