/**
 * Import the createSlice and PayloadAction utilities from Redux Toolkit
 * @see https://redux-toolkit.js.org/api/createslice
 */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

/**
 * Import the types
 */
import type { InternalDaVinciConfig } from './config.types.js';
import { Endpoints } from './wellknown.types.js';

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
     * @param {PayloadAction<InternalDaVinciConfig>} action - The action to be dispatched
     * @returns {void}
     */
    set(state, action: PayloadAction<InternalDaVinciConfig>) {
      state.clientId = action.payload.clientId || '';
      state.redirectUri = action.payload.redirectUri || `${location.origin}/handle-redirect`;
      if ('responseType' in action.payload && action.payload.responseType) {
        state.responseType = action.payload.responseType;
      } else {
        state.responseType = 'code';
      }

      state.scope = action.payload.scope || 'openid';

      const {
        authorization_endpoint: authorize,
        issuer: issuer,
        introspection_endpoint: introspection,
        token_endpoint: tokens,
        userinfo_endpoint: userinfo,
      } = action.payload.wellknownResponse;

      state.endpoints = {
        authorize,
        issuer,
        introspection,
        tokens,
        userinfo,
      };
    },
  },
});
