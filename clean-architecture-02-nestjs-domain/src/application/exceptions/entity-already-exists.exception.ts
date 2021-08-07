export class EntityAlreadyExistsException extends Error {
  constructor(entityName: 'User' | 'Post') {
    super(
      `Cannot create a new record for: ${entityName} because it already exists`,
    );
  }
}
