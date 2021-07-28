export class InvalidIdException extends Error {
  constructor() {
    super(
      "The given ID cannot be processed, are you sure it's the right format?"
    )
  }
}
