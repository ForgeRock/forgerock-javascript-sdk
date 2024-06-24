import { describe, it, expect } from 'vitest';

import { transformSubmitRequest, transformActionRequest } from './davinci.utils';
import { NodeState } from './node.types';

describe('transformNextRequest', () => {
  it('should transform node state to DaVinciRequest for next request', () => {
    const node: NodeState = {
      cache: {
        key: '123',
      },
      client: {
        collectors: [
          {
            category: 'SingleValueCollector',
            input: { key: 'username', value: 'john', type: 'TEXT' },
            output: { key: 'username', label: 'Username', type: 'TEXT' },
            type: 'TextCollector',
            id: 'abc',
            name: 'username',
          },
          {
            category: 'SingleValueCollector',
            input: { key: 'password', value: 'secret', type: 'PASSWORD' },
            output: { key: 'password', label: 'Password', type: 'PASSWORD' },
            type: 'TextCollector',
            id: 'xyz',
            name: 'password',
          },
        ],
      },
      server: {
        id: '123',
        eventName: 'login',
        interactionId: '456',
      },
      status: 'continue',
    };

    const expectedRequest = {
      id: '123',
      eventName: 'login',
      interactionId: '456',
      parameters: {
        eventType: 'submit',
        data: {
          actionKey: 'SIGNON',
          formData: {
            username: 'john',
            password: 'secret',
          },
        },
      },
    };

    const result = transformSubmitRequest(node);
    expect(result).toEqual(expectedRequest);
  });

  it('should return empty formData when there are no action collectors', () => {
    const node = {
      cache: {
        key: '123',
      },
      client: {
        collectors: [],
      },
      server: {
        id: '123',
        eventName: 'login',
        interactionId: '456',
      },
      status: 'continue',
    };

    const expectedRequest = {
      id: '123',
      eventName: 'login',
      interactionId: '456',
      parameters: {
        eventType: 'submit',
        data: {
          actionKey: 'SIGNON',
          formData: {},
        },
      },
    };

    const result = transformSubmitRequest(node);
    expect(result).toEqual(expectedRequest);
  });
});

describe('transformActionRequest', () => {
  it('should transform node state to DaVinciRequest for action request', () => {
    const node = {
      cache: {
        key: '123',
      },
      client: {
        collectors: [],
      },
      server: {
        id: '123',
        eventName: 'click',
        interactionId: '456',
      },
      status: 'continue',
    };
    const action = 'SUBMIT_FORM';

    const expectedRequest = {
      id: '123',
      eventName: 'click',
      interactionId: '456',
      parameters: {
        eventType: 'action',
        data: {
          actionKey: 'SUBMIT_FORM',
        },
      },
    };

    const result = transformActionRequest(node, action);
    expect(result).toEqual(expectedRequest);
  });
});