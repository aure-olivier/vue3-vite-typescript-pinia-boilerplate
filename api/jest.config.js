/**
 * Jest Configuration
 * @type {import('@jest/types/build/Config').ProjectConfig}
 * https://jestjs.io/docs/configuration
 */
module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  testTimeout: 30000,
  testEnvironment: 'node',
  testMatch: [
    '**/test/**/*.spec.ts'
  ]
};
