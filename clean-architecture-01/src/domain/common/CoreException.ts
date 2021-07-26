export class CoreException extends Error {
  constructor(msg = 'Something went wrong in Core') {
    super(msg)
  }
}
