import { Guard } from '@domain/common/guard';

describe('guard', () => {
  describe('againstNullOrUndefined', () => {
    test('it should return false when not all props are defined', () => {
      const testNull = Guard.againstNullOrDefined({
        id: 1,
        name: null,
      });

      expect(testNull).toBeFalsy();

      const testUndefined = Guard.againstNullOrDefined({
        id: 1,
        name: undefined,
      });

      expect(testUndefined).toBeFalsy();
    });

    test('it should return true when all props are defined', () => {
      const success = Guard.againstNullOrDefined({
        id: 1,
        name: 'name',
      });

      expect(success).toBeTruthy();
    });
  });
});
