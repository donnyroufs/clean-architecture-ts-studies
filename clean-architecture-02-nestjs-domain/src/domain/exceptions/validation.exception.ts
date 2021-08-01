export class ValidationException extends Error {
  constructor(
    prop = 'unknown',
    public readonly details?: Record<string, unknown>,
  ) {
    super(`Failed to validate: ${prop}`);
  }
}
