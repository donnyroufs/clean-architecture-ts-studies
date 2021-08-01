import { User } from '@domain/user/user.entity';
import { Role } from '@domain/user/roles.enum';
import { UserEmail } from '@domain/user/user-email';
import { UserLocation } from '@domain/user/user-location';

describe('user-entity', () => {
  describe('when creating a new user', () => {
    test('then it should return a new user', () => {
      const user = User.create({
        email: UserEmail.create('test@email.com'),
        location: UserLocation.create({
          city: 'London',
          country: 'England',
        }),
        password: 'asdasd',
        role: Role.ADMIN,
      });

      expect(user.email).toBe(user.email);
    });
  });
});
