import { describe, it, expect } from 'vitest';
import { configSlice } from './config.slice.js';

describe('The config slice reducers', () => {
  it('should return state with minimal config', () => {
    expect(
      configSlice.reducer(undefined, {
        type: 'config/set',
        payload: {
          clientId: '123',
          serverConfig: {
            wellknown: 'https://base.example.com/as/.wellknown/openidconfiguration',
          },
          wellknownResponse: {
            authorization_endpoint: 'https://base.example.com/as/authorize',
          },
        },
      }),
    ).toEqual({
      redirectUri: 'http://localhost:3000/handle-redirect',
      responseType: 'code',
      scope: 'openid',
      clientId: '123',
      endpoints: {
        authorize: 'https://base.example.com/as/authorize',
        introspection: undefined,
        issuer: undefined,
        tokens: undefined,
        userinfo: undefined,
      },
    });
  });

  it('should handle setting the configuration', () => {
    const action = {
      type: 'config/set',
      payload: {
        clientId: '1234',
        redirectUri: 'https://example.com',
        responseType: 'code',
        scope: 'openid profile email',
        serverConfig: {
          wellknown: 'https://base.example.com/as/.wellknown/openidconfiguration',
        },
        wellknownResponse: {
          authorization_endpoint: 'https://base.example.com/as/authorize',
        },
      },
    };

    expect(configSlice.reducer(undefined, action)).toEqual({
      clientId: '1234',
      redirectUri: 'https://example.com',
      responseType: 'code',
      scope: 'openid profile email',
      endpoints: {
        authorize: 'https://base.example.com/as/authorize',
        introspection: undefined,
        issuer: undefined,
        tokens: undefined,
        userinfo: undefined,
      },
    });
  });
});
