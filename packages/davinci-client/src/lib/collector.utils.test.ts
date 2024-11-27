import { describe, it, expect } from 'vitest';

import { returnActionCollector } from './collector.utils.js';
import { returnSingleValueCollector } from './collector.utils.js';

import type { ActionCollectorTypes, SingleValueCollectorTypes } from './collector.types.js';
import type { DaVinciField } from './davinci.types.d.ts';

describe('returnActionCollector', () => {
  const mockField: DaVinciField = {
    key: 'testKey',
    label: 'Test Label',
    type: 'TestType',
  };

  it('should return a valid ActionCollector with all parameters provided', () => {
    const idx = 1;
    const collectorType: ActionCollectorTypes = 'SubmitCollector';
    const result = returnActionCollector(mockField, idx, collectorType);
    //             ^?
    expect(result).toEqual({
      //   ^?
      category: 'ActionCollector',
      type: collectorType,
      id: `${mockField.key}-${idx}`,
      name: mockField.key,
      output: {
        key: mockField.key,
        label: mockField.label,
        type: mockField.type,
      },
    });
  });
});

describe('returnSingleValueCollector', () => {
  const mockField: DaVinciField = {
    key: 'testKey',
    label: 'Test Label',
    type: 'TestType',
  };

  it('should return a valid SingleValueCollector with all parameters provided', () => {
    const idx = 1;
    const collectorType: SingleValueCollectorTypes = 'PasswordCollector';
    const result = returnSingleValueCollector(mockField, idx, collectorType);
    expect(result).toEqual({
      category: 'SingleValueCollector',
      type: collectorType,
      id: `${mockField.key}-${idx}`,
      name: mockField.key,
      input: {
        key: mockField.key,
        value: '',
        type: mockField.type,
      },
      output: {
        key: mockField.key,
        label: mockField.label,
        type: mockField.type,
      },
    });
  });
});
