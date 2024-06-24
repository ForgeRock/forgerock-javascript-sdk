/**
 * Import necessary Redux Toolkit modules
 */
import { configureStore } from '@reduxjs/toolkit';

/**
 * Import RTK slices and api
 */
import { nodeSlice } from './node.slice';
import { davinciApi } from './davinci.api';
import { configSlice } from './config.slice';

/**
 * Import the DaVinciRequest types
 */
import { DaVinciAction, DaVinciRequest } from './davinci.types';
import { SingleValueCollector } from './node.types';

interface SetupLoginOptions {
  config: {
    clientId: string;
    redirectUri?: string;
    ResponseType?: string;
    scope?: string;
    serverConfig: {
      baseUrl: string;
    };
  };
}
export async function davinciClient({ config }: SetupLoginOptions) {
  /**
   * Export the store for use in the application
   */
  const store = configureStore({
    reducer: {
      config: configSlice.reducer,
      node: nodeSlice.reducer,
      [davinciApi.reducerPath]: davinciApi.reducer,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(davinciApi.middleware);
    },
  });

  store.dispatch(configSlice.actions.set(config));

  return {
    // Pass store methods to the client
    subscribe: store.subscribe,
    getState: store.getState,

    // Export custom methods for the client
    collectors: () => {
      return store.getState().node.client.collectors || [];
    },
    flow: (action: DaVinciAction) => {
      return async function () {
        await store.dispatch(davinciApi.endpoints.flow.initiate(action));
        const node = store.getState().node;
        return node;
      };
    },
    next: async (args?: DaVinciRequest) => {
      await store.dispatch(davinciApi.endpoints.next.initiate(args));
      const node = store.getState().node;
      return node;
    },
    node: () => {
      return store.getState().node;
    },
    start: async () => {
      await store.dispatch(davinciApi.endpoints.start.initiate());
      return store.getState().node;
    },
    update: (collector: SingleValueCollector) => {
      const { id } = collector;
      return function (value: string, index?: number) {
        store.dispatch(nodeSlice.actions.update({ id, value, index }));
      };
    },
  };
}
