import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { describe, it, expect } from 'vitest';
import type { DaVinciConfig } from './config.types.js';

// Assuming the initialState is as follows:
const initialState = {
  clientId: '',
  redirectUri: '',
  responseType: '',
  scope: '',
  serverConfig: {
    baseUrl: '',
  },
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    set(state, action: PayloadAction<DaVinciConfig>) {
      state.clientId = action.payload.clientId || '';
      state.redirectUri = action.payload.redirectUri || `${location.origin}/handle-redirect`;
      state.responseType = action.payload.responseType || 'code';
      state.scope = action.payload.scope || 'openid';

      if (!action.payload.serverConfig?.baseUrl) {
        state.serverConfig = {
          baseUrl: '',
        };
      } else if (action.payload.serverConfig?.baseUrl.endsWith('/')) {
        state.serverConfig = {
          baseUrl: action.payload.serverConfig?.baseUrl,
        };
      } else {
        state.serverConfig = {
          baseUrl: action.payload.serverConfig?.baseUrl.concat('/'),
        };
      }
    },
  },
});

describe('configSlice', () => {
  const { set } = configSlice.actions;

  it('should set the configuration correctly with a complete action', () => {
    const action = set({
      clientId: 'test-client-id',
      redirectUri: 'http://example.com/redirect',
      responseType: 'token',
      scope: 'profile',
      serverConfig: {
        baseUrl: 'http://server.com/api',
      },
    });

    const expectedState = {
      clientId: 'test-client-id',
      redirectUri: 'http://example.com/redirect',
      responseType: 'token',
      scope: 'profile',
      serverConfig: {
        baseUrl: 'http://server.com/api/',
      },
    };

    expect(configSlice.reducer(initialState, action)).toEqual(expectedState);
  });

  it('should use default values when no values are provided', () => {
    const action = set({});
    const expectedState = {
      clientId: '',
      redirectUri: `${location.origin}/handle-redirect`,
      responseType: 'code',
      scope: 'openid',
      serverConfig: {
        baseUrl: '',
      },
    };

    expect(configSlice.reducer(initialState, action)).toEqual(expectedState);
  });

  it('should set serverConfig baseUrl correctly when baseUrl does not end with a slash', () => {
    const action = set({
      serverConfig: {
        baseUrl: 'http://server.com/am',
      },
    });

    const expectedState = {
      clientId: '',
      redirectUri: `${location.origin}/handle-redirect`,
      responseType: 'code',
      scope: 'openid',
      serverConfig: {
        baseUrl: 'http://server.com/am/',
      },
    };

    expect(configSlice.reducer(initialState, action)).toEqual(expectedState);
  });

  it('should set serverConfig baseUrl correctly when baseUrl ends with a slash', () => {
    const action = set({
      serverConfig: {
        baseUrl: 'http://server.com/am/',
      },
    });

    const expectedState = {
      clientId: '',
      redirectUri: `${location.origin}/handle-redirect`,
      responseType: 'code',
      scope: 'openid',
      serverConfig: {
        baseUrl: 'http://server.com/am/',
      },
    };

    expect(configSlice.reducer(initialState, action)).toEqual(expectedState);
  });
});
