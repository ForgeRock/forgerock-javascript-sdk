import { configureStore } from '@reduxjs/toolkit';

import { configSlice } from './config.slice.js';
import { nodeSlice } from './node.slice.js';
import { davinciApi } from './davinci.api.js';
import { ErrorNode, ContinueNode, StartNode, SuccessNode } from '../types.js';
import { wellknownApi } from './wellknown.api.js';

export function createClientStore() {
  return configureStore({
    reducer: {
      config: configSlice.reducer,
      node: nodeSlice.reducer,
      [davinciApi.reducerPath]: davinciApi.reducer,
      [wellknownApi.reducerPath]: wellknownApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(davinciApi.middleware).concat(wellknownApi.middleware),
  });
}

type ClientStore = typeof createClientStore;

export type RootState = ReturnType<ReturnType<ClientStore>['getState']>;

export interface RootStateWithNode<T extends ErrorNode | ContinueNode | StartNode | SuccessNode>
  extends RootState {
  node: T;
}

export type AppDispatch = ReturnType<ReturnType<ClientStore>['dispatch']>;
