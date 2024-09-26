/**
 * Import the required utilities from Redux Toolkit
 */
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';

/**
 * Import the needed reducers
 */
import { nodeCollectorReducer, updateCollectorValues } from './node.reducer';

/**
 * Import the types
 */
import type { ActionCollector } from './collector.types';
import type {
  DaVinciCacheEntry,
  DavinciErrorResponse,
  DavinciNextResponse,
  DavinciSuccessResponse,
  DaVinciErrorCacheEntry,
} from './davinci.types';
import type { NextNode, SuccessNode, ErrorNode, StartNode } from './node.types';

/**
 * @const initialNodeState - Initial state for the node slice
 */
export const initialNodeState = {
  cache: null,
  client: null,
  error: null,
  server: null,
  status: 'start',
};

type NodeStates = ErrorNode | NextNode | SuccessNode | StartNode;

/**
 * @const nodeSlice - Slice for handling the node state
 * @see https://redux-toolkit.js.org/api/createSlice
 */
export const nodeSlice = createSlice({
  name: 'node',
  initialState: initialNodeState as NodeStates,
  reducers: {
    /**
     * @method error - Method for creating an error node
     * @param {Object} state - The current state of the slice
     * @param {PayloadAction<DaVinciErrorCacheEntry<DavinciErrorResponse>>} action - The action to be dispatched
     * @returns {ErrorNode} - The error node
     */
    error(state, action: PayloadAction<DaVinciErrorCacheEntry<DavinciErrorResponse>>) {
      const newState = state as Draft<ErrorNode>;

      // Reference to the original response from DaVinci in the cache
      newState.cache = {
        key: action.payload.requestId,
      };

      // Data for the client to consume
      newState.client = null;

      newState.error = {
        code: action.payload.error.data.code,
        message: action.payload.error.data.message,
        httpCode: action.payload.error.data.httpResponseCode,
        type: 'genericError', // TODO: logic for error type identification
      };

      // Data that the server users
      newState.server = {
        id: action.payload.error.data.id,
        interactionId: action.payload.error.data.interactionId,
        interactionToken: action.payload.error.data.interactionToken,
      };

      // Used to help detect the node type
      newState.status = 'error';

      return newState;
    },
    /**
     * @method next - Method for creating a next node
     * @param {Object} state - The current state of the slice
     * @param {PayloadAction<DaVinciCacheEntry<DavinciNextResponse>>} action - The action to be dispatched
     * @returns {NextNode} - The next node
     */
    next(state, action: PayloadAction<DaVinciCacheEntry<DavinciNextResponse>>) {
      const newState = state as Draft<NextNode>;
      const collectors = nodeCollectorReducer([], {
        type: action.type,
        payload: action.payload.data?.form?.components?.fields,
      });
      const submitCollector = collectors.find(
        (collector) => collector.type === 'SubmitCollector',
      ) as ActionCollector;

      // Reference to the original response from DaVinci in the cache
      newState.cache = {
        key: action.payload.requestId,
      };

      // Data for the client to consume
      newState.client = {
        action: submitCollector?.output.key,
        description: action.payload.data?.form?.description,
        collectors,
        name: action.payload.data.form?.name,
      };

      // Data that the server users
      newState.server = {
        _links: action.payload.data._links,
        id: action.payload.data.id,
        interactionId: action.payload.data.interactionId,
        interactionToken: action.payload.data.interactionToken,
        eventName: action.payload.data.eventName,
      };

      // Used to help detect the node type
      newState.status = 'next';

      return newState;
    },
    /**
     * @method start - Method for creating a start node
     * @param {Object} state - The current state of the slice
     * @returns {StartNode} - The start node
     */
    success(state, action: PayloadAction<DaVinciCacheEntry<DavinciSuccessResponse>>) {
      const newState = state as Draft<SuccessNode>;

      // Reference to the original response from DaVinci in the cache
      newState.cache = {
        key: action.payload.requestId,
      };

      // Data for the client to consume
      newState.client = {
        authorization: {
          code: action.payload.data.authorizeResponse?.code,
          state: action.payload.data.authorizeResponse?.state,
        },
      };

      // Data that the server users
      newState.server = {
        id: action.payload.data.id,
        interactionId: action.payload.data.interactionId,
        interactionToken: action.payload.data.interactionToken,
        session: action.payload.data.session?.id,
      };

      // Used to help detect the node type
      newState.status = 'success';

      return newState;
    },

    /**
     * @method update - Method for updating collector values with the node
     * @param {Object} state - The current state of the slice
     * @param {PayloadAction<unknown>} action - The action to be dispatched
     * @returns {NextNode} - The next node
     */
    update(state, action: ReturnType<typeof updateCollectorValues>) {
      // TODO: Improve type
      const newState = state as Draft<NextNode>;

      newState.client.collectors = nodeCollectorReducer(newState.client.collectors, action);

      return newState;
    },
  },
  selectors: {
    selectClient: (state) => {
      return state.client;
    },
    selectCollectors: (state) => {
      // Let's check if the node has a client and collectors
      if (state.status !== 'next') {
        console.error('`collectors` are only available on nodes with `status` of `next`');
        return [];
      }
      return state.client.collectors || [];
    },
    selectServer: (state) => {
      return state.server;
    },
  },
});
