import middlewareWrapper from './middleware';
import middleware from './middleware.mock.data';

jest.mock('../config/index', () => ({
  get: () => ({ middleware }),
}));

describe('Middleware should be called with an action', () => {
  it('should run all middleware testing action for letter and "a"', () => {
    const newReq = middlewareWrapper({ url: new URL('https://www.example.com'), init: {} }, 'a');
    expect(newReq.init).toStrictEqual({ headers: { 'x-letter': 'true', 'x-char': 'a' } });
    expect(newReq.url.toString()).toBe('https://www.example.com/?letter=true&char=a');
  });
  it('should run all middleware testing action for number and "1"', () => {
    const newReq = middlewareWrapper({ url: new URL('https://www.example.com'), init: {} }, '1');
    expect(newReq.init).toStrictEqual({ headers: { 'x-letter': 'false', 'x-char': '1' } });
    expect(newReq.url.toString()).toBe('https://www.example.com/?letter=false&char=1');
  });
  it('should run all middleware testing action for no match', () => {
    const newReq = middlewareWrapper({ url: new URL('https://www.example.com'), init: {} }, 'z');
    expect(newReq.init).toStrictEqual({});
    expect(newReq.url.toString()).toBe('https://www.example.com/');
  });
  it('should run all middleware testing add action with payload', () => {
    const newReq = middlewareWrapper(
      { url: new URL('https://www.example.com'), init: { headers: { 'x-number': '3' } } },
      'ADD',
      'b',
    );
    expect(newReq.init).toStrictEqual({ headers: { 'x-number': '3', 'x-char': 'a,b' } });
  });
  it('should not allow middleware to reassign `req`', () => {
    const newReq = middlewareWrapper(
      { url: new URL('https://www.example.com'), init: {} },
      'REASSIGNMENT',
    );
    expect(newReq.init).toStrictEqual({});
    expect(newReq.url.toString()).toBe('https://www.example.com/');
  });
  it('should not allow middleware to mutate `action`', () => {
    try {
      const newReq = middlewareWrapper(
        { url: new URL('https://www.example.com'), init: {} },
        'MUTATE-ACTION',
      );
    } catch (err) {
      expect(err.message).toBe(`Cannot assign to read only property 'type' of object '#<Object>'`);
    }
  });
});
