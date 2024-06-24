import { createAction, createReducer, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DaVinciField, DaVinciResponse } from './davinci.types';
import { SingleValueCollector, ActionCollector, NodeState } from './node.types';
import {
  returnActionCollector,
  returnFlowCollector,
  returnPasswordCollector,
  returnSingleValueCollector,
  returnSubmitCollector,
  returnTextCollector,
} from './collector.utils';

export const initialNodeState: NodeState = {
  cache: {
    key: '',
  },
  status: '',
  server: {
    id: '',
    interactionId: '',
    interactionToken: '',
    href: '',
    eventName: '',
  },
  client: {
    name: '',
    description: '',
    collectors: [],
  },
};

const setNodeValues = createAction<DaVinciField[]>('node/set');
const updateNodeValues = createAction<{
  id: string;
  value: string;
  index?: number;
}>('node/update');
const initialNodeValues: (SingleValueCollector | ActionCollector)[] = [];
export const nodeValuesReducer = createReducer(initialNodeValues, (builder) => {
  builder
    .addCase(setNodeValues, (_: (SingleValueCollector | ActionCollector)[], action) => {
      // Map the fields to the initial state with the schema of Generic Collector
      const collectors = action.payload.map((field: DaVinciField, idx: number) => {
        // Specific Collectors
        switch (field.type) {
          case 'SUBMIT_BUTTON':
            return returnSubmitCollector(field, idx);
          case 'FLOW_BUTTON':
            return returnFlowCollector(field, idx);
          case 'PASSWORD':
            return returnPasswordCollector(field, idx);
          case 'TEXT':
            return returnTextCollector(field, idx);
          default:
          // Default is handled below by if statement
        }

        // Generic Collectors
        if (field.type.includes('BUTTON')) {
          return returnActionCollector(field, idx);
        }

        return returnSingleValueCollector(field, idx);
      });
      return collectors || [];
    })
    .addCase(updateNodeValues, (state: any[], action) => {
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
export const nodeSlice = createSlice({
  name: 'node',
  initialState: initialNodeState,
  reducers: {
    complete(state, action: PayloadAction<DaVinciResponse>) {
      state.authorization = {
        code: action.payload.data.authorizeResponse?.code,
        state: action.payload.data.authorizeResponse?.state,
      };
      state.cache.key = action.payload.requestId;
      state.error = {
        message: action.payload.data.message,
        httpCode: action.payload.data.httpResponseCode,
        code: action.payload.data.code,
      };
      state.session = action.payload.data.session?.id;
      state.status = 'complete';
      state.success = action.payload.data.success ? true : false;

      state.server.id = action.payload.data.id;
      state.server.interactionId = action.payload.data.interactionId;
      state.server.interactionToken = action.payload.data.interactionToken;
    },
    set(state, action: PayloadAction<DaVinciResponse>) {
      state.cache.key = action.payload.requestId;

      state.client.name = action.payload.data.form?.name;
      state.client.description = action.payload.data?.form?.description;
      state.client.collectors = nodeValuesReducer(state.client?.collectors, {
        type: action.type,
        payload: action.payload.data?.form?.components?.fields,
      });

      state.server.id = action.payload.data.id;
      state.server.interactionId = action.payload.data.interactionId;
      state.server.interactionToken = action.payload.data.interactionToken;
      state.server.href = action.payload.data._links?.next?.href;
      state.server.eventName = action.payload.data.eventName;

      state.status = action.payload.data.eventName || 'unknown';
    },
    update(state, action: PayloadAction<any>) {
      state.client.collectors = nodeValuesReducer(state.client.collectors, action);
    },
  },
});
