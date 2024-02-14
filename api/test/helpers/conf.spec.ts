// Helpers
import conf from '../../src/helpers/conf';

describe('helpers/conf.ts', () => {
  it('should export attributes', () => {
    expect(conf.dev).toBe(false);
  });
});
