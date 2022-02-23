import * as github from '@actions/github';
import { constructUrls } from './construct-urls';

describe('should construct urls from environment', () => {
  beforeEach(() => {
    Object.defineProperty(github, 'context', {
      value: {
        payload: {
          pull_request: {
            number: 12,
          },
        },
      },
    });
  });
  it('should construct the urls correctly based on inputs', () => {
    const result = constructUrls();
    expect(result).toEqual([
      'https://reactjs-todo-12-forgerock.cloud.okteto.com',
      'https://angular-todo-12-forgerock.cloud.okteto.com',
      'https://todo-api-12-forgerock.cloud.okteto.com',
      'https://mock-api-12-forgerock.cloud.okteto.com',
      'https://autoscript-apps-12-forgerock.cloud.okteto.com',
    ]);
  });
});
