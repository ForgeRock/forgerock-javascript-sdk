/**
 * Import the required utilities from Redux Toolkit
 */
import { createSlice } from '@reduxjs/toolkit';

/**
 * Import the needed reducers
 */
import { nodeCollectorReducer, updateCollectorValues } from './node.reducer';

/**
 * Import the types
 */
import type { Draft, PayloadAction } from '@reduxjs/toolkit';
import type { SubmitCollector } from './collector.types';
import type {
  DavinciErrorResponse,
  DaVinciFailureResponse,
  DaVinciNextResponse,
  DaVinciSuccessResponse,
} from './davinci.types';
import type { ContinueNode, SuccessNode, ErrorNode, StartNode, FailureNode } from './node.types';

/**
 * The possible statuses for the four types of nodes
 */
const CONTINUE_STATUS = 'continue';
const ERROR_STATUS = 'error';
const FAILURE_STATUS = 'failure';
const SUCCESS_STATUS = 'success';
const START_STATUS = 'start';

/**
 * @const initialNodeState - Initial state for the node slice
 */
export const initialNodeState = {
  cache: null,
  client: {
    status: START_STATUS,
  },
  error: null,
  server: {
    status: START_STATUS,
  },
  status: START_STATUS,
};

type NodeStates = ErrorNode | FailureNode | ContinueNode | SuccessNode | StartNode;

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
    error(
      state,
      action: PayloadAction<{ data: DavinciErrorResponse; requestId: string; httpStatus: number }>,
    ) {
      const newState = state as Draft<ErrorNode>;

      // Reference to the original response from DaVinci in the cache
      newState.cache = {
        key: action.payload.requestId,
      };

      // Data for the client to consume
      newState.client = {
        status: ERROR_STATUS,
      };

      newState.error = {
        code: action.payload.data.code,
        details: action.payload.data.details,
        message: action.payload.data.message,
        internalHttpStatus: action.payload.data.httpResponseCode,
        status: 'error',
        type: 'davinci_error',
      };

      newState.httpStatus = action.payload.httpStatus;

      // Data that the server users
      newState.server = {
        id: action.payload.data.id,
        interactionId: action.payload.data.interactionId,
        interactionToken: action.payload.data.interactionToken,
        status: ERROR_STATUS,
      };

      // Used to help detect the node type
      newState.status = ERROR_STATUS;

      return newState;
    },

    /**
     * @method failure - Method for creating an error node
     * @param {Object} state - The current state of the slice
     * @param {PayloadAction<DaVinciFailureResponse>} action - The action to be dispatched
     * @returns {FailureNode} - The error node
     */
    failure(
      state,
      action: PayloadAction<{
        data: DaVinciFailureResponse | unknown;
        requestId: string;
        httpStatus: number;
      }>,
    ) {
      const newState = state as Draft<FailureNode>;

      newState.cache = {
        key: action.payload.requestId,
      };

      newState.client = {
        status: FAILURE_STATUS,
      };

      if (action.payload.data && typeof action.payload.data === 'object') {
        const data = action.payload.data as Record<string, string>;

        newState.error = {
          code: data['code'] || 'unknown',
          message: data['message'] || data['errorMessage'] || '',
          internalHttpStatus:
            typeof data['httpResponseCode'] === 'number' ? data['httpResponseCode'] : 0,
          status: FAILURE_STATUS,
          type: 'davinci_error',
        };
      } else {
        newState.error = {
          code: 'unknown',
          message: 'An unknown error occurred',
          status: FAILURE_STATUS,
          type: 'network_error',
        };
      }

      newState.httpStatus = action.payload.httpStatus;

      newState.server = {
        status: FAILURE_STATUS,
      };

      newState.status = FAILURE_STATUS;

      return newState;
    },

    /**
     * @method next - Method for creating a next node
     * @param {Object} state - The current state of the slice
     * @param {PayloadAction<DaVinciNextResponse>} action - The action to be dispatched
     * @returns {ContinueNode} - The next node
     */
    next(
      state,
      action: PayloadAction<{ data: DaVinciNextResponse; requestId: string; httpStatus: number }>,
    ) {
      const newState = state as Draft<ContinueNode>;

      const collectors = nodeCollectorReducer([], {
        type: action.type,
        payload: action.payload.data?.form?.components?.fields,
      });

      const submitCollector = collectors.filter(
        (collector): collector is SubmitCollector => collector.type === 'SubmitCollector',
      )[0];

      newState.cache = {
        key: action.payload.requestId,
      };

      newState.client = {
        action: submitCollector?.output.key,
        description: action.payload.data?.form?.description,
        collectors,
        name: action.payload.data.form?.name,
        status: CONTINUE_STATUS,
      };

      newState.httpStatus = action.payload.httpStatus;

      newState.server = {
        _links: action.payload.data._links,
        id: action.payload.data.id,
        interactionId: action.payload.data.interactionId,
        interactionToken: action.payload.data.interactionToken,
        eventName: action.payload.data.eventName,
        status: CONTINUE_STATUS,
      };

      // Used to help detect the node type
      newState.status = CONTINUE_STATUS;

      return newState;
    },
    /**
     * @method start - Method for creating a start node
     * @param {Object} state - The current state of the slice
     * @returns {StartNode} - The start node
     */
    success(
      state,
      action: PayloadAction<{
        data: DaVinciSuccessResponse;
        requestId: string;
        httpStatus: number;
      }>,
    ) {
      const newState = state as Draft<SuccessNode>;

      newState.cache = {
        key: action.payload.requestId,
      };

      newState.client = {
        authorization: {
          code: action.payload.data.authorizeResponse?.code,
          state: action.payload.data.authorizeResponse?.state,
        },
        status: SUCCESS_STATUS,
      };

      newState.httpStatus = action.payload.httpStatus;

      newState.server = {
        id: action.payload.data.id,
        interactionId: action.payload.data.interactionId,
        interactionToken: action.payload.data.interactionToken,
        session: action.payload.data.session?.id,
        status: SUCCESS_STATUS,
      };

      newState.status = SUCCESS_STATUS;

      return newState;
    },

    /**
     * @method update - Method for updating collector values with the node
     * @param {Object} state - The current state of the slice
     * @param {PayloadAction<unknown>} action - The action to be dispatched
     * @returns {ContinueNode} - The next node
     */
    update(state, action: ReturnType<typeof updateCollectorValues>) {
      const newState = state as Draft<ContinueNode>;

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
      if (state.status !== CONTINUE_STATUS) {
        console.error(
          `\`collectors are only available on nodes with \`status\` of ${CONTINUE_STATUS}`,
        );
        return [];
      }
      return state.client.collectors || [];
    },
    selectCollector: (state, id: string) => {
      // Let's check if the node has a client and collectors
      if (state.status !== CONTINUE_STATUS) {
        console.error(
          `\`collectors are only available on nodes with \`status\` of ${CONTINUE_STATUS}`,
        );
        return;
      }
      return state.client.collectors?.find((collector) => collector.id === id);
    },
    selectError: (state) => {
      return state.error;
    },
    selectServer: (state) => {
      return state.server;
    },
  },
});
