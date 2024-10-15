import { interceptor } from './interceptor.js';

describe('interceptor', () => {
  it('should error when no urls are passed in', () => {
    expect(() => interceptor({} as any)).toThrow('Config: `config.interceptor.urls` is required');
  });
});
