import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DaVinciConfig } from './config.types';

/**
 * Define the configuration slice for Redux Toolkit
 */
export const configSlice = createSlice({
  name: 'config',
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
    set(state, action: PayloadAction<DaVinciConfig>) {
      state.clientId = action.payload.clientId || '';
      state.redirectUri = action.payload.redirectUri || `${location.origin}/handle-redirect`;
      state.responseType = action.payload.responseType || 'code';
      state.scope = action.payload.scope || 'openid';
      state.serverConfig = {
        baseUrl: action.payload.serverConfig?.baseUrl || '',
      };
    },
  },
});
