import { ValidationException } from '@domain/exceptions/validation.exception';
import { PostTitle } from '@domain/post/post-title';

describe('post-title', () => {
  describe('when creating a new post-title', () => {
    test('then it should throw a validation exception when the title does not match the business rules', () => {
      expect(() => {
        PostTitle.create({
          value: '2313 -12 3s # @',
        });
      }).toThrow(ValidationException);
    });

    test('then it should return a post-title when provided with a valid title', () => {
      const post = PostTitle.create({
        value: 'title is cool',
      });

      expect(post).toBeDefined();
    });
  });
});
