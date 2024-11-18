import { describe, it, expect, vi } from 'vitest';

import { handleResponse, transformSubmitRequest, transformActionRequest } from './davinci.utils.js';

import type { NextNode } from './node.types.d.ts';
import { next0 } from './mock-data/davinci.next.mock.js';
import { DaVinciCacheEntry } from './davinci.types.js';
import { error0a, error3 } from './mock-data/davinci.error.mock.js';
import { success0 } from './mock-data/davinci.success.mock.js';

describe('transformSubmitRequest', () => {
  it('should transform node state to DaVinciRequest for next request', () => {
    const node: NextNode = {
      cache: {
        key: '123',
      },
      client: {
        action: 'SIGNON',
        collectors: [
          {
            category: 'SingleValueCollector',
            error: null,
            input: { key: 'username', value: 'john', type: 'TEXT' },
            output: { key: 'username', label: 'Username', type: 'TEXT' },
            type: 'TextCollector',
            id: 'abc',
            name: 'username',
          },
          {
            category: 'SingleValueCollector',
            error: null,
            input: { key: 'password', value: 'secret', type: 'PASSWORD' },
            output: { key: 'password', label: 'Password', type: 'PASSWORD' },
            type: 'PasswordCollector',
            id: 'xyz',
            name: 'password',
          },
        ],
        status: 'next' as const,
      },
      error: null,
      httpStatus: 200,
      server: {
        id: '123',
        eventName: 'login',
        interactionId: '456',
        status: 'next' as const,
      },
      status: 'next',
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
    const node: NextNode = {
      cache: {
        key: '123',
      },
      client: {
        action: 'SIGNON',
        collectors: [],
        status: 'next' as const,
      },
      error: null,
      httpStatus: 200,
      server: {
        id: '123',
        eventName: 'login',
        interactionId: '456',
        status: 'next' as const,
      },
      status: 'next' as const,
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
    const node: NextNode = {
      cache: {
        key: '123',
      },
      client: {
        action: 'SIGNON',
        collectors: [],
        status: 'next' as const,
      },
      error: null,
      httpStatus: 200,
      server: {
        id: '123',
        eventName: 'click',
        interactionId: '456',
        status: 'next' as const,
      },
      status: 'next' as const,
    };
    const action = 'TEST_ACTION';

    const expectedRequest = {
      id: '123',
      eventName: 'click',
      interactionId: '456',
      parameters: {
        eventType: 'action',
        data: {
          actionKey: 'TEST_ACTION',
        },
      },
    };

    const result = transformActionRequest(node, action);
    expect(result).toEqual(expectedRequest);
  });
});

describe('handleResponse', () => {
  it('should handle a next response', () => {
    const cacheEntry = {
      data: next0,
      error: undefined,
      requestId: '123',
      status: 'fulfilled',
      isError: false,
      isSuccess: true,
    } as DaVinciCacheEntry;
    const dispatch = vi.fn();
    const status = 200;

    handleResponse(cacheEntry, dispatch, status);

    expect(dispatch).toHaveBeenCalledOnce();

    const [action] = dispatch.mock.calls[0];
    expect(action.type).toBe('node/next');
  });

  it('should handle a success response', () => {
    const cacheEntry = {
      data: success0,
      error: undefined,
      requestId: '123',
      status: 'fulfilled',
      isError: false,
      isSuccess: true,
    } as DaVinciCacheEntry;
    const dispatch = vi.fn();
    const status = 200;

    handleResponse(cacheEntry, dispatch, status);

    expect(dispatch).toHaveBeenCalledOnce();

    const [action] = dispatch.mock.calls[0];
    expect(action.type).toBe('node/success');
  });

  it('should handle an error response', () => {
    const cacheEntry = {
      data: undefined,
      error: { data: error0a, status: 400 },
      requestId: '123',
      status: 'rejected',
      isError: true,
      isSuccess: false,
    } as DaVinciCacheEntry;
    const dispatch = vi.fn();
    const status = 400;

    handleResponse(cacheEntry, dispatch, status);

    expect(dispatch).toHaveBeenCalledOnce();

    const [action] = dispatch.mock.calls[0];
    expect(action.type).toBe('node/error');
  });

  it('should handle an error response', () => {
    const cacheEntry = {
      data: {
        error: {
          code: 'unknown',
          status: 400,
        },
      },
      error: undefined,
      requestId: '123',
      status: 'fulfilled',
      isError: false,
      isSuccess: true,
    } as DaVinciCacheEntry;
    const dispatch = vi.fn();
    const status = 400;

    handleResponse(cacheEntry, dispatch, status);

    expect(dispatch).toHaveBeenCalledOnce();

    const [action] = dispatch.mock.calls[0];
    expect(action.type).toBe('node/failure');
  });

  it('should handle an error response', () => {
    const cacheEntry = {
      data: {
        status: 'failure',
      },
      error: undefined,
      requestId: '123',
      status: 'fulfilled',
      isError: false,
      isSuccess: true,
    } as DaVinciCacheEntry;
    const dispatch = vi.fn();
    const status = 400;

    handleResponse(cacheEntry, dispatch, status);

    expect(dispatch).toHaveBeenCalledOnce();

    const [action] = dispatch.mock.calls[0];
    expect(action.type).toBe('node/failure');
  });

  it('should handle an failure with specific capability and connector response', () => {
    const cacheEntry = {
      data: undefined,
      error: {
        data: {
          connectorId: 'pingOneAuthenticationConnector',
          capabilityName: 'returnSuccessResponseRedirect',
        },
        status: 400,
      },
      requestId: '123',
      status: 'rejected',
      isError: true,
      isSuccess: false,
    } as DaVinciCacheEntry;
    const dispatch = vi.fn();
    const status = 400;

    handleResponse(cacheEntry, dispatch, status);

    expect(dispatch).toHaveBeenCalledOnce();

    const [action] = dispatch.mock.calls[0];
    expect(action.type).toBe('node/failure');
  });

  it('should handle an failure from timeout response', () => {
    const cacheEntry = {
      data: undefined,
      error: { data: error3, status: 400 },
      requestId: '123',
      status: 'rejected',
      isError: true,
      isSuccess: false,
    } as DaVinciCacheEntry;
    const dispatch = vi.fn();
    const status = 400;

    handleResponse(cacheEntry, dispatch, status);

    expect(dispatch).toHaveBeenCalledOnce();

    const [action] = dispatch.mock.calls[0];
    expect(action.type).toBe('node/failure');
  });

  it('should handle an 500 failure response', () => {
    const cacheEntry = {
      data: undefined,
      error: { data: {}, status: 500 },
      requestId: '123',
      status: 'rejected',
      isError: true,
      isSuccess: false,
    } as DaVinciCacheEntry;
    const dispatch = vi.fn();
    const status = 500;

    handleResponse(cacheEntry, dispatch, status);

    expect(dispatch).toHaveBeenCalledOnce();

    const [action] = dispatch.mock.calls[0];
    expect(action.type).toBe('node/failure');
  });
});
