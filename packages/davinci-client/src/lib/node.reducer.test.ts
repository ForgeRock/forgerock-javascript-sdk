import { describe, it, expect } from 'vitest';

import { nodeCollectorReducer } from './node.reducer';
import { SubmitCollector, TextCollector } from './collector.types';

describe('The node collector reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'node/next', payload: [] };
    expect(nodeCollectorReducer(undefined, action)).toEqual([]);
  });

  it('should handle next node with one field', () => {
    const action = {
      type: 'node/next',
      payload: [
        {
          key: 'username',
          type: 'TEXT',
          label: 'Username',
        },
      ],
    };
    expect(nodeCollectorReducer(undefined, action)).toEqual([
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'TextCollector',
        id: 'username-0',
        name: 'username',
        input: {
          key: 'username',
          value: '',
          type: 'TEXT',
        },
        output: {
          key: 'username',
          label: 'Username',
          type: 'TEXT',
        },
      },
    ]);
  });

  it('should handle next node with multiple fields', () => {
    const action = {
      type: 'node/next',
      payload: [
        {
          key: 'username',
          type: 'TEXT',
          label: 'Username',
        },
        {
          key: 'password',
          type: 'PASSWORD',
          label: 'Password',
        },
        {
          key: 'submit',
          type: 'SUBMIT_BUTTON',
          label: 'Submit',
        },
      ],
    };
    expect(nodeCollectorReducer(undefined, action)).toEqual([
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'TextCollector',
        id: 'username-0',
        name: 'username',
        input: {
          key: 'username',
          value: '',
          type: 'TEXT',
        },
        output: {
          key: 'username',
          label: 'Username',
          type: 'TEXT',
        },
      },
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'PasswordCollector',
        id: 'password-1',
        name: 'password',
        input: {
          key: 'password',
          value: '',
          type: 'PASSWORD',
        },
        output: {
          key: 'password',
          label: 'Password',
          type: 'PASSWORD',
        },
      },
      {
        category: 'ActionCollector',
        error: null,
        type: 'SubmitCollector',
        id: 'submit-2',
        name: 'submit',
        output: {
          key: 'submit',
          label: 'Submit',
          type: 'SUBMIT_BUTTON',
          url: null,
        },
      },
    ]);
  });

  it('should handle collector updates ', () => {
    const action = {
      type: 'node/update',
      payload: {
        id: 'username-0',
        value: 'JaneSmith',
      },
    };
    const state: TextCollector[] = [
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'TextCollector',
        id: 'username-0',
        name: 'username',
        input: {
          key: 'username',
          value: '',
          type: 'TEXT',
        },
        output: {
          key: 'username',
          label: 'First Name',
          type: 'TEXT',
        },
      },
    ];
    expect(nodeCollectorReducer(state, action)).toEqual([
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'TextCollector',
        id: 'username-0',
        name: 'username',
        input: {
          key: 'username',
          value: 'JaneSmith',
          type: 'TEXT',
        },
        output: {
          key: 'username',
          label: 'First Name',
          type: 'TEXT',
        },
      },
    ]);
  });

  it('should throw with no collectors', () => {
    const action = {
      type: 'node/update',
      payload: {
        id: 'submit-1',
        value: 'JaneSmith',
      },
    };
    const state: TextCollector[] = [
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'TextCollector',
        id: 'wrongcollector-0',
        name: 'username',
        input: {
          key: 'username',
          value: '',
          type: 'TEXT',
        },
        output: {
          key: 'username',
          label: 'First Name',
          type: 'TEXT',
        },
      },
    ];
    expect(() => nodeCollectorReducer(state, action)).toThrowError('No collector found to update');
  });

  it('should throw with no Action Collector', () => {
    const action = {
      type: 'node/update',
      payload: {
        id: 'submit-1',
        value: 'JaneSmith',
      },
    };
    const state: (TextCollector | SubmitCollector)[] = [
      {
        category: 'SingleValueCollector',
        error: null,
        type: 'TextCollector',
        id: 'wrongcollector-0',
        name: 'username',
        input: {
          key: 'username',
          value: '',
          type: 'TEXT',
        },
        output: {
          key: 'username',
          label: 'First Name',
          type: 'TEXT',
        },
      },
      {
        category: 'ActionCollector',
        error: null,
        type: 'SubmitCollector',
        id: 'submit-1',
        name: 'submit',
        output: {
          key: 'submit',
          label: 'Submit',
          type: 'SUBMIT_BUTTON',
          url: null,
        },
      },
    ];
    expect(() => nodeCollectorReducer(state, action)).toThrowError(
      'ActionCollectors are read-only',
    );
  });
});
