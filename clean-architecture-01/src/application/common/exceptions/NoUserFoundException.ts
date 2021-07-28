export class NoUserFoundException extends Error {
  constructor(id: string) {
    super(`No user found with the id: ${id}`)
  }
}
