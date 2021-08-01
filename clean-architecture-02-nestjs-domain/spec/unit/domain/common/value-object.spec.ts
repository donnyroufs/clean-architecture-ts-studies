import { ValueObject } from '@domain/common/value-object';

class Name extends ValueObject<{ value: string }> {
  get value() {
    return this.props.value;
  }
}

describe('value-object', () => {
  describe('when invoking equals', () => {
    test('then it should compare two value objects and return true when they are identical in value', () => {
      const n1 = new Name({ value: 'name1' });
      const n2 = new Name({ value: 'name1' });

      expect(n1.equals(n2)).toBeTruthy();
    });

    test('then it should compare two value objects and return false when they are not identical in value', () => {
      const n1 = new Name({ value: 'name1' });
      const n2 = new Name({ value: 'name' });

      expect(n1.equals(n2)).toBeFalsy();
    });
  });
});
