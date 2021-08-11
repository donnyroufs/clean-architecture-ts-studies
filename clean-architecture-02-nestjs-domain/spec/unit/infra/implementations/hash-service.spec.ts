import argon from 'argon2';
import { HashService } from '@infra/implementations/hash.service';
import { mocked } from 'ts-jest/utils';

jest.mock('argon2', () => ({
  default: {
    hash: jest.fn().mockReturnValue('woef'),
    verify: jest.fn(),
  },
}));

describe('hash-service', () => {
  const hashService = new HashService();

  describe('hashPassword', () => {
    test('should return a hashed string', async () => {
      const result = await hashService.hashPassword('woef');

      expect(argon.hash).toHaveBeenCalledWith('woef');
      expect(result).toBe('woef');
    });
  });

  describe('verify', () => {
    test('should return false when passwords do not match', async () => {
      mocked(argon).verify.mockReturnValueOnce(
        new Promise((res) => res(false)),
      );

      const result = await hashService.verify('woef', 'hashed###');

      expect(argon.verify).toHaveBeenCalledWith('woef', 'hashed###');
      expect(result).toBeFalsy();
    });

    test('should return true when passwords match', async () => {
      mocked(argon).verify.mockReturnValueOnce(new Promise((res) => res(true)));

      const result = await hashService.verify('woef', 'hashed###woef');

      expect(argon.verify).toHaveBeenCalledWith('woef', 'hashed###woef');
      expect(result).toBeTruthy();
    });
  });
});
