import { describe, it, expect } from 'vitest';
import { configSlice } from './config.slice.js';
import { Endpoints } from './wellknown.types.js';

// Assuming the initialState is as follows:
const initialState = {
  endpoints: {
    authorize: '',
    issuer: '',
    tokens: '',
    userinfo: '',
    introspection: '',
  } as Endpoints,
  clientId: '',
  redirectUri: '',
  responseType: '',
  scope: '',
  baseUrl: '',
};

describe('configSlice', () => {
  const { set } = configSlice.actions;

  it('should set the configuration correctly with a complete action', () => {
    const action = set({
      clientId: 'test-client-id',
      redirectUri: 'http://example.com/redirect',
      scope: 'profile',
      responseType: 'token',
      serverConfig: {
        wellknown: 'wellknown',
      },
      endpoints: {
        authorize: '',
        issuer: '',
        tokens: '',
        userinfo: '',
        introspection: '',
      },
    });

    const expectedState = {
      endpoints: {
        authorize: '',
        issuer: '',
        tokens: '',
        userinfo: '',
        introspection: '',
      },
      clientId: 'test-client-id',
      redirectUri: 'http://example.com/redirect',
      responseType: 'token',
      scope: 'profile',
      baseUrl: '',
    };

    expect(configSlice.reducer(initialState, action)).toEqual(expectedState);
  });
});
