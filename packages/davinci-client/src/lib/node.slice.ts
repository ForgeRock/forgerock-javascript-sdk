/**
 * Import the required utilities from Redux Toolkit
 */
import {
  createAction,
  createReducer,
  createSlice,
  type Draft,
  type PayloadAction,
} from '@reduxjs/toolkit';

/**
 * Import the collector utilities
 */
import {
  returnActionCollector,
  returnFlowCollector,
  returnPasswordCollector,
  returnSingleValueCollector,
  returnSocialLoginCollector,
  returnSubmitCollector,
  returnTextCollector,
} from './collector.utils.js';

/**
 * Import the types
 */
import type { SingleValueCollector, ActionCollector } from './collector.types.d.ts';
import type {
  DaVinciField,
  DaVinciCacheEntry,
  DavinciErrorResponse,
  DavinciNextResponse,
  DavinciSuccessResponse,
  DaVinciErrorCacheEntry,
} from './davinci.types.d.ts';
import type { NextNode, SuccessNode, ErrorNode, StartNode } from './node.types.d.ts';

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

/**
 * @const nextCollectorValues - Action for setting the next collector values
 * @see https://redux-toolkit.js.org/api/createAction
 *
 * This is for internal "collector" setup for handling the state of the current node
 */
const nextCollectorValues = createAction<DaVinciField[]>('node/next');
const updateCollectorValues = createAction<{
  id: string;
  value: string;
  index?: number;
}>('node/update');

/**
 * @const initialCollectorValues - Initial state for the collector values
 */
const initialCollectorValues: (SingleValueCollector | ActionCollector)[] = [];

/**
 * @const nodeCollectorReducer - Reducer for handling the collector values
 * @see https://redux-toolkit.js.org/api/createReducer
 */
export const nodeCollectorReducer = createReducer(initialCollectorValues, (builder) => {
  builder
    /**
     * Using the `nextCollectorValues` const (e.g. `'node/next'`) to add the case
     * 'node/next' is essentially derived `createSlice` below. `node.next()` is
     * transformed to `'node/next'` for the action type.
     */
    .addCase(nextCollectorValues, (_: (SingleValueCollector | ActionCollector)[], action) => {
      // Map the fields to the initial state with the schema of Generic Collector
      const collectors = action.payload.map((field: DaVinciField, idx: number) => {
        // Specific Collectors
        switch (field.type) {
          case 'SUBMIT_BUTTON':
            return returnSubmitCollector(field, idx);
          case 'FLOW_BUTTON':
            return returnFlowCollector(field, idx);
          case 'SOCIAL_LOGIN_BUTTON':
            return returnSocialLoginCollector(field, idx);
          case 'PASSWORD':
            return returnPasswordCollector(field, idx);
          case 'TEXT':
            return returnTextCollector(field, idx);
          default:
          // Default is handled below
        }

        // Generic Collectors
        if (field.type.includes('BUTTON')) {
          return returnActionCollector(field, idx);
        }

        return returnSingleValueCollector(field, idx);
      });
      return collectors || [];
    })
    /**
     * Using the `updateCollectorValues` const (e.g. `'node/update'`) to add the case
     * 'node/next' is essentially derived `createSlice` below. `node.next()` is
     * transformed to `'node/next'` for the action type.
     */
    .addCase(updateCollectorValues, (state: any[], action) => {
      const collector = state.find((collector) => collector.id === action.payload.id);
      if (!collector) {
        console.error('Collector not found');
        // TODO: Handle error
      }
      if (collector.input.length > 1 && !action.payload.index) {
        console.error('Index not provided');
        // TODO: Handle error
      }
      if (action.payload.index) {
        collector.input[action.payload.index].value = action.payload.value;
      }
      collector.input.value = action.payload.value;
    });
});

/**
 * @const nodeSlice - Slice for handling the node state
 * @see https://redux-toolkit.js.org/api/createSlice
 */
export const nodeSlice = createSlice({
  name: 'node',
  initialState: initialNodeState as ErrorNode | NextNode | SuccessNode | StartNode,
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
     * @param {PayloadAction<any>} action - The action to be dispatched
     * @returns {NextNode} - The next node
     */
    update(state, action: PayloadAction<any>) {
      // TODO: Improve type
      const newState = state as Draft<NextNode>;

      newState.client.collectors = nodeCollectorReducer(newState.client.collectors, action);

      return newState;
    },
  },
});
