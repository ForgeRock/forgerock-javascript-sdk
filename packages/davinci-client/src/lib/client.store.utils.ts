import { configureStore } from '@reduxjs/toolkit';

import { configSlice } from './config.slice.js';
import { nodeSlice } from './node.slice.js';
import { davinciApi } from './davinci.api.js';
import { ErrorNode, NextNode, StartNode, SuccessNode } from '../types.js';

export function createClientStore() {
  return configureStore({
    reducer: {
      config: configSlice.reducer,
      node: nodeSlice.reducer,
      [davinciApi.reducerPath]: davinciApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(davinciApi.middleware);
    },
  });
}

type ClientStore = typeof createClientStore;

export type RootState = ReturnType<ReturnType<ClientStore>['getState']>;

export interface RootStateWithNode<T extends ErrorNode | NextNode | StartNode | SuccessNode>
  extends RootState {
  node: T;
}

export type AppDispatch = ReturnType<ReturnType<ClientStore>['dispatch']>;
