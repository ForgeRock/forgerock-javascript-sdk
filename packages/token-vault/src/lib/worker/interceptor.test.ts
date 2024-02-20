import { interceptor } from './interceptor';

describe('interceptor', () => {
  it('should error when no urls are passed in', () => {
    expect(() => interceptor({} as any)).toThrow('Config: `config.interceptor.urls` is required');
  });
});
