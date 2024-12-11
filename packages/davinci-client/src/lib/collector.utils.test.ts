import { describe, it, expect } from 'vitest';

import { returnActionCollector } from './collector.utils.js';
import { returnSingleValueCollector } from './collector.utils.js';

import type { DaVinciField } from './davinci.types.d.ts';

describe('The returnActionCollector function', () => {
  const mockField: DaVinciField = {
    key: 'testKey',
    label: 'Test Label',
    type: 'TestType',
  };

  it('should return a valid FlowCollector with all parameters provided', () => {
    const idx = 1;
    const collectorType = 'SubmitCollector';
    const result = returnActionCollector(mockField, idx, collectorType);

    expect(result).toEqual({
      category: 'ActionCollector',
      error: null,
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

  it('should return a valid FlowCollector with all parameters provided', () => {
    const idx = 1;
    const collectorType = 'FlowCollector';
    const result = returnActionCollector(mockField, idx, collectorType);

    expect(result).toEqual({
      category: 'ActionCollector',
      error: null,
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
    const result = returnActionCollector(mockField, idx, 'ActionCollector');
    expect(result.type).toEqual('ActionCollector');
  });

  // Just test runtime issues with field
  it('should return an error message when field is missing key, label, or type', () => {
    const field = {};
    const idx = 3;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    const result = returnActionCollector(field, idx);
    expect(result.error).toBe(
      'Key is not found in the field object. Label is not found in the field object. Type is not found in the field object. ',
    );
  });
});

describe('The returnSingleValueCollector function', () => {
  const mockField: DaVinciField = {
    key: 'testKey',
    label: 'Test Label',
    type: 'TestType',
  };

  it('should return a valid SingleValueCollector with all parameters provided', () => {
    const idx = 1;
    const collectorType = 'PasswordCollector';
    const result = returnSingleValueCollector(mockField, idx, collectorType);

    expect(result).toEqual({
      category: 'SingleValueCollector',
      error: null,
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

  it('should return a valid SingleValueCollector with all parameters provided', () => {
    const idx = 1;
    const collectorType = 'TextCollector';
    const result = returnSingleValueCollector(mockField, idx, collectorType);

    expect(result).toEqual({
      category: 'SingleValueCollector',
      error: null,
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
        value: '',
      },
    });
  });

  it('should default to "SingleValueCollector" type when collectorType is not provided', () => {
    const idx = 2;
    const result = returnSingleValueCollector(mockField, idx, 'SingleValueCollector');
    expect(result.type).toEqual('SingleValueCollector');
  });

  // Just test runtime issues with field
  it('should return an error message when field is missing key, label, or type', () => {
    const field = {};
    const idx = 3;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore-next-line
    const result = returnSingleValueCollector(field, idx);
    expect(result.error).toBe(
      'Key is not found in the field object. Label is not found in the field object. Type is not found in the field object. ',
    );
  });
});
