import { ValidationException } from '@domain/exceptions/validation.exception';
import { UserEmail } from '@domain/user/user-email';

describe('user-email', () => {
  describe('when creating a new email', () => {
    test('then it should throw a validation exception when some of its props are not undefined', () => {
      expect(() => {
        UserEmail.create(undefined);
      }).toThrow(ValidationException);
    });

    test('then it should throw a validation exception when failed to validate the email', () => {
      expect(() => {
        UserEmail.create('woef');
      }).toThrowError(ValidationException);
    });

    test('then it should return a valid user-email when provided with a valid email', () => {
      const userEmail = UserEmail.create('test@email.com');

      expect(userEmail.value).toBe('test@email.com');
    });
  });
});
