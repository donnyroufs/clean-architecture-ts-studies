export class EntityNotFoundException extends Error {
  constructor(entityName: 'User' | 'Post') {
    super(`Could not find a record for ${entityName}`);
  }
}
