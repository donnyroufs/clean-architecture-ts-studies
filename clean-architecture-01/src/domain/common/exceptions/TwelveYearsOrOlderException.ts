export class TwelveYearsOrOlderException extends Error {
  constructor() {
    super('You have to be 12 years or older to create an account.')
  }
}
