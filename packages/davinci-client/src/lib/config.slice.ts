/**
 * Import the createSlice and PayloadAction utilities from Redux Toolkit
 * @see https://redux-toolkit.js.org/api/createslice
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Import the types
 */
import type { DaVinciConfig } from './config.types.js';
import { Endpoints, OpenIdResponse } from './wellknown.types.js';

function transformOpenIdResponseToEndpoints(value: OpenIdResponse): Endpoints {
  return {
    authorize: value.authorization_endpoint,
    issuer: value.issuer,
    introspection: value.introspection_endpoint,
    tokens: value.token_endpoint,
    userinfo: value.userinfo_endpoint,
  };
}

/**
 * @const initialState - The initial state of the configuration slice
 * NOTE: The clientId, redirectUri, responseType, and scope are set to empty strings
 */
const initialState = {
  endpoints: {} as Endpoints,
  clientId: '',
  redirectUri: '',
  responseType: '',
  scope: '',
};

/**
 * @const configSlice - Define the configuration slice for Redux state management
 * @see https://redux-toolkit.js.org/api/createslice
 */
export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducerPath: 'config',
  reducers: {
    /**
     * @method set - Set the configuration for the DaVinci client
     * @param {Object} state - The current state of the slice
     * @param {PayloadAction<DaVinciConfig>} action - The action to be dispatched
     * @returns {void}
     */
    set(state, action: PayloadAction<DaVinciConfig>) {
      state.clientId = action.payload.clientId || '';
      state.redirectUri = action.payload.redirectUri || `${location.origin}/handle-redirect`;
      if ('responseType' in action.payload) {
        state.responseType = action.payload.responseType;
      } else {
        state.responseType = 'code';
      }
      state.scope = action.payload.scope || 'openid';

      if ('openIdConfiguration' in action.payload) {
        state.endpoints = transformOpenIdResponseToEndpoints(action.payload.openIdConfiguration);
      }
    },
  },
});
