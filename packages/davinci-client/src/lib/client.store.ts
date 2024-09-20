/**
 * Import necessary Redux Toolkit modules
 */
import { configureStore } from '@reduxjs/toolkit';

/**
 * Import RTK slices and api
 */
import { nodeSlice } from './node.slice.js';
import { davinciApi } from './davinci.api.js';
import { configSlice } from './config.slice.js';

/**
 * Import the DaVinciRequest types
 */
import type { DaVinciConfig } from './config.types';
import type { DaVinciAction, DaVinciRequest } from './davinci.types';
import type { SingleValueCollector } from './collector.types';

/**
 * Create a client function that returns a set of methods
 * to interact with and normalize the DaVinci API.
 *
 * @function davinciClient - returns an "observable" client for DaVinci flows
 * @param {ConfigurationOptions} options - the configuration options for the client
 * @returns {Observable} - an observable client for DaVinci flows
 */
export async function davinci({ config }: { config: DaVinciConfig }) {
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

    /**
     * @method collectors - A convenience method to get the collectors from state
     * @returns {Collector[]} - The collectors from the current node in state
     */
    collectors: () => {
      const state = store.getState();
      // Let's check if the node has a client and collectors
      if (state.node.client && 'collectors' in state.node.client) {
        return state.node.client?.collectors || [];
      }
      // Return an empty array if no client or collectors are found
      return [];
    },

    /**
     * @method flow - Method for initiating a new flow, different than current flow
     * @param {DaVinciAction} action - the action to initiate the flow
     * @returns {function} - an async function to call the flow
     */
    flow: (action: DaVinciAction) => {
      return async function () {
        await store.dispatch(davinciApi.endpoints.flow.initiate(action));
        const node = store.getState().node;
        return node;
      };
    },

    /**
     * @method next - Method for initiating the next node in the current flow
     * @param {DaVinciRequest} args - the arguments to pass to the next
     * @returns {Promise} - a promise that resolves to the next node
     */
    next: async (args?: DaVinciRequest) => {
      await store.dispatch(davinciApi.endpoints.next.initiate(args));
      const node = store.getState().node;
      return node;
    },

    /**
     * @method node - Just a convenience method to get the node from state
     * @returns {Node} - the current node from state
     */
    node: () => {
      return store.getState().node;
    },

    /**
     * @method start - Method for initiating a DaVinci flow
     * @returns {Promise} - a promise that initiates a DaVinci flow and returns a node
     */
    start: async () => {
      await store.dispatch(davinciApi.endpoints.start.initiate());
      return store.getState().node;
    },

    /**
     * @method update - Exclusive method for updating the current node with user provided values
     * @param {SingleValueCollector} collector - the collector to update
     * @returns {function} - an async function to call for updating collector value
     */
    update: (collector: SingleValueCollector) => {
      const { id } = collector;
      return function (value: string, index?: number) {
        store.dispatch(nodeSlice.actions.update({ id, value, index }));
      };
    },
  };
}
