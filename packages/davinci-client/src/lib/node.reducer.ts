/**
 * Import the required utilities from Redux Toolkit
 */
import { createAction, createReducer } from '@reduxjs/toolkit';

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

import type { DaVinciField } from './davinci.types';
import {
  ActionCollector,
  FlowCollector,
  PasswordCollector,
  SingleValueCollector,
  SocialLoginCollector,
  SubmitCollector,
  TextCollector,
} from './collector.types.js';

/**
 * @const nextCollectorValues - Action for setting the next collector values
 * @see https://redux-toolkit.js.org/api/createAction
 *
 * This is for internal "collector" setup for handling the state of the current node
 */
export const nextCollectorValues = createAction<DaVinciField[]>('node/next');
export const updateCollectorValues = createAction<{
  id: string;
  value: string;
  index?: number;
}>('node/update');

/**
 * @const initialCollectorValues - Initial state for the collector values
 */
const initialCollectorValues: (
  | FlowCollector
  | PasswordCollector
  | TextCollector
  | SocialLoginCollector
  | SubmitCollector
  | ActionCollector<'ActionCollector'>
  | SingleValueCollector<'SingleValueCollector'>
)[] = [];

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
    .addCase(nextCollectorValues, (_, action) => {
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
          return returnActionCollector(field, idx, 'ActionCollector');
        }

        return returnSingleValueCollector(field, idx, 'SingleValueCollector');
      });
      return collectors || [];
    })
    /**
     * Using the `updateCollectorValues` const (e.g. `'node/update'`) to add the case
     * 'node/next' is essentially derived `createSlice` below. `node.next()` is
     * transformed to `'node/next'` for the action type.
     */
    .addCase(updateCollectorValues, (state, action) => {
      const collector = state.find((collector) => collector.id === action.payload.id);
      if (!collector) {
        throw new Error('No collector found to update');
      }
      if (collector.category === 'ActionCollector') {
        throw new Error('ActionCollectors are read-only');
      }
      collector.input.value = action.payload.value;
    });
});
