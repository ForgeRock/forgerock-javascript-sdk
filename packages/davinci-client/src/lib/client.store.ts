/**
 * Import RTK slices and api
 */
import { createClientStore } from './client.store.utils.js';
import { nodeSlice } from './node.slice.js';
import { davinciApi } from './davinci.api.js';
import { configSlice } from './config.slice.js';

/**
 * Import the DaVinciRequest types
 */
import type { DaVinciConfig } from './config.types.js';
import type { DaVinciAction, DaVinciRequest } from './davinci.types.js';
import type { SingleValueCollectors } from './collector.types.js';
import { wellknownApi } from './wellknown.api.js';

/**
 * Create a client function that returns a set of methods
 * to interact with and normalize the DaVinci API.
 *
 * @function davinciClient - returns an "observable" client for DaVinci flows
 * @param {ConfigurationOptions} options - the configuration options for the client
 * @returns {Observable} - an observable client for DaVinci flows
 */
export async function davinci({ config }: { config: DaVinciConfig }) {
  const store = createClientStore();

  if (!config.serverConfig.wellknown) {
    throw Error('wellknown endpoint required as part of the `config.serverOptions` ');
  }

  const { data: openIdResponse } = await store.dispatch(
    wellknownApi.endpoints.wellknown.initiate(config.serverConfig.wellknown),
  );

  if (!openIdResponse) {
    throw Error('error fetching wellknown response');
  }

  store.dispatch(configSlice.actions.set({ ...config, wellknownResponse: openIdResponse }));

  return {
    // Pass store methods to the client
    subscribe: store.subscribe,

    /**
     * @method flow - Method for initiating a new flow, different than current flow
     * @param {DaVinciAction} action - the action to initiate the flow
     * @returns {function} - an async function to call the flow
     */
    flow: (action: DaVinciAction) => {
      if (!action.action) {
        console.error('Missing `argument.action`');
        return async function () {
          return { message: 'Missing argument.action' };
        };
      }

      return async function () {
        await store.dispatch(davinciApi.endpoints.flow.initiate(action));
        const node = nodeSlice.selectSlice(store.getState());
        return node;
      };
    },

    /**
     * @method next - Method for initiating the next node in the current flow
     * @param {DaVinciRequest} args - the arguments to pass to the next
     * @returns {Promise} - a promise that resolves to the next node
     */
    next: async (args?: DaVinciRequest) => {
      const nodeCheck = nodeSlice.selectSlice(store.getState());
      if (nodeCheck.status === 'start') {
        return {
          ...nodeCheck,
          error: 'Please use `start` before calling `next`',
        };
      }

      await store.dispatch(davinciApi.endpoints.next.initiate(args));
      const node = nodeSlice.selectSlice(store.getState());
      return node;
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
     * @returns {function} - an function to call for updating collector value
     */
    // TODO: expose return value for application layer
    update: (collector: SingleValueCollectors) => {
      if (!collector.id) {
        console.error('Argument for `collector` has no ID');
        return function () {
          return { message: 'Argument for `collector` has no ID' };
        };
      }

      const { id } = collector;
      const collectorToUpdate = nodeSlice.selectors.selectCollector(store.getState(), id);

      if (!collectorToUpdate) {
        return function () {
          console.error('Collector not found');
          return { message: 'Collector not found' };
        };
      }

      if (collectorToUpdate.category !== 'SingleValueCollector') {
        console.error('Collector is not a SingleValueCollector and cannot be updated');
        return function () {
          return { message: 'Collector is not a SingleValueCollector and cannot be updated' };
        };
      }

      return function (value: string, index?: number) {
        try {
          store.dispatch(nodeSlice.actions.update({ id, value, index }));
          return null;
        } catch (err) {
          const error = err as Error;
          return { message: error.message };
        }
      };
    },

    /**
     * @method client - Selector to get the node.client from state
     * @returns {Node.client} - the client property from the current node
     */
    getClient: () => nodeSlice.selectors.selectClient(store.getState()),

    /**
     * @method collectors - Selector to get the collectors from state
     * @returns {Collector[]} - The collectors from the current node in state
     */
    getCollectors: () => {
      const state = store.getState();
      const client = nodeSlice.selectors.selectClient(state);
      // Let's check if the node has a client and collectors
      if (client && 'collectors' in client) {
        return nodeSlice.selectors.selectCollectors(state) || [];
      }
      // Return an empty array if no client or collectors are found
      return [];
    },

    getError: () => {
      const state = store.getState();
      return nodeSlice.selectors.selectError(state);
    },

    /**
     * @method node - Selector to get the node from state
     * @returns {Node} - the current node from state
     */
    getNode: () => {
      return nodeSlice.selectSlice(store.getState());
    },

    /**
     * @method server - Selector to get the node.server from state
     * @returns {Node.server} - the server property from the current node
     */
    getServer: () => {
      const state = store.getState();
      return nodeSlice.selectors.selectServer(state);
    },

    /**
     * Utilities to help query cached responses from server
     */
    cache: {
      getLatestResponse: () => {
        const node = nodeSlice.selectSlice(store.getState());

        if (!node.cache?.key) {
          console.error(`Cannot find current node's cache key or no current node`);
          return null;
        }

        const flowItem = davinciApi.endpoints.flow.select(node.cache.key);
        const nextItem = davinciApi.endpoints.next.select(node.cache.key);
        const startItem = davinciApi.endpoints.start.select(node.cache.key);

        return flowItem || nextItem || startItem;
      },
      getResponseWithId: (requestId: string) => {
        if (!requestId) {
          console.error('Please provide the cache key');
          return null;
        }

        const flowItem = davinciApi.endpoints.flow.select(requestId);
        const nextItem = davinciApi.endpoints.next.select(requestId);
        const startItem = davinciApi.endpoints.start.select(requestId);

        return flowItem || nextItem || startItem;
      },
    },
  };
}
