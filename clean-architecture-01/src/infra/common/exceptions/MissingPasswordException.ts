export class MissingPasswordException extends Error {
  constructor() {
    super('Missing password')
  }
}
