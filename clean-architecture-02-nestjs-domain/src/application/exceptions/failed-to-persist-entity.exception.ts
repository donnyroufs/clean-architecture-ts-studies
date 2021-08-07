export class FailedToPersistEntityException extends Error {
  constructor(entityName: 'User' | 'Post') {
    super(`Could not persist: ${entityName}`);
  }
}
