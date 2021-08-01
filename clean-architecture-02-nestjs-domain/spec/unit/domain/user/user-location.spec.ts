import { ValidationException } from '@domain/exceptions/validation.exception';
import { UserLocation } from '@domain/user/user-location';

describe('user-location', () => {
  describe('when creating a new user-location', () => {
    const props = {
      country: 'England',
      city: 'London',
    };

    test('then it should throw a validation exception when some of its props are not undefined', () => {
      expect(() => {
        UserLocation.create({
          city: '',
          country: undefined,
        });
      }).toThrow(ValidationException);
    });

    test('then it should return a valid user-location', () => {
      const userEmail = UserLocation.create(props);

      expect(userEmail.city).toEqual(props.city);
      expect(userEmail.country).toEqual(props.country);
    });
  });
});
