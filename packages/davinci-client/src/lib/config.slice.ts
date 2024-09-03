/**
 * Import the createSlice and PayloadAction utilities from Redux Toolkit
 * @see https://redux-toolkit.js.org/api/createslice
 */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

/**
 * Import the types
 */
import { DaVinciConfig } from './config.types';

/**
 * @const configSlice - Define the configuration slice for Redux state management
 * @see https://redux-toolkit.js.org/api/createslice
 */
export const configSlice = createSlice({
  name: 'config',
  /**
   * @const initialState - The initial state of the configuration slice
   * NOTE: The clientId, redirectUri, responseType, and scope are set to empty strings
   */
  initialState: {
    clientId: '',
    redirectUri: '',
    responseType: '',
    scope: '',
    serverConfig: {
      baseUrl: '',
    },
  },
  reducers: {
    /**
     * @method set - Set the configuration for the DaVinci client
     * @param {Object} state - The current state of the slice
     * @param {PayloadAction<DaVinciConfig>} action - The action to be dispatched
     * @returns {void}
     */
    set(state, action: PayloadAction<DaVinciConfig>) {
      state.clientId = action.payload.clientId || '';
      state.redirectUri =
        action.payload.redirectUri || `${location.origin}/handle-redirect`;
      state.responseType = action.payload.responseType || 'code';
      state.scope = action.payload.scope || 'openid';
      state.serverConfig = {
        baseUrl: action.payload.serverConfig?.baseUrl || '',
      };
    },
  },
});
