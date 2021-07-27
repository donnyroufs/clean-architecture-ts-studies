/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

export default {
  coverageProvider: 'v8',
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['<rootDir>/testSetup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '@Domain/(.*)': '<rootDir>/src/domain/$1',
    '@Application/(.*)': '<rootDir>/src/application/$1',
    '@Infra/(.*)': '<rootDir>/src/infra/$1',
    '@Web/(.*)': '<rootDir>/src/web/$1',
  },
  testEnvironment: 'node',
}
