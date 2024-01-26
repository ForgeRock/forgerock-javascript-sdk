import { asyncEvents, verifyUserInfo } from './async-events';

describe('assert exports are there', () => {
  it('should assert top level api', () => {
    expect(verifyUserInfo).toBeDefined();
    expect(asyncEvents).toBeDefined();
    expect(asyncEvents({} as any)).toEqual({
      clickButton: expect.any(Function),
      clickLink: expect.any(Function),
      getTokens: expect.any(Function),
      navigate: expect.any(Function),
      pressEnter: expect.any(Function),
      pressSpacebar: expect.any(Function),
    });
  });
});
