import { httpSw } from './http-sw';

describe('httpSw', () => {
  it('should work', () => {
    expect(httpSw()).toEqual('http-sw');
  });
});
