import { describe, it, expect } from 'vitest';

import { returnActionCollector } from './collector.utils';
import { returnSingleValueCollector } from './collector.utils';

import { ActionCollectorTypes, SingleValueCollectorTypes } from './node.types';
import { DaVinciField } from './davinci.types';

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
    expect(result).toEqual({
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

  it('should default to "ActionCollector" type when collectorType is not provided', () => {
    const idx = 2;
    const result = returnActionCollector(mockField, idx);
    expect(result.type).toEqual('ActionCollector');
  });

  // Additional tests for edge cases and invalid inputs can be added here
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

  it('should default to "SingleValueCollector" type when collectorType is not provided', () => {
    const idx = 2;
    const result = returnSingleValueCollector(mockField, idx);
    expect(result.type).toEqual('SingleValueCollector');
  });

  // Additional tests for edge cases and invalid inputs can be added here
});
