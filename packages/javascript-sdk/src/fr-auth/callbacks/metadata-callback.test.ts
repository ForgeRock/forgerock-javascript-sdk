import { expect, test } from 'vitest';
import { Callback } from '../../auth/interfaces';
import { CallbackType } from '../../auth/enums';
import PingOneProtectInitializeCallback from './ping-protect-initialize-callback';
import MetadataCallback from './metadata-callback';
import PingOneProtectEvaluationCallback from './ping-protect-evaluation-callback';

test('returns metadata if no type matches', () => {
  const data: Callback = {
    type: CallbackType.MetadataCallback,
    output: [
      {
        value: 'value',
        name: 'name',
      },
    ],
    input: [
      {
        name: 'value',
        value: 'name',
      },
    ],
  };
  const result = new MetadataCallback(data).parse(0);
  expect(result).toEqual(new MetadataCallback(data).getData());
});

test('returns initializeCallback', () => {
  const data: Callback = {
    type: CallbackType.MetadataCallback,
    output: [
      {
        name: 'data',
        value: {
          _type: 'PingOneProtect',
          _action: 'protect_initialize',
          envId: 'some_id',
          consoleLogEnabled: true,
          deviceAttributesToIgnore: [],
          customHost: '',
          lazyMetadata: true,
          behavioralDataCollection: true,
          disableHub: true,
          deviceKeyRsyncIntervals: 10,
          enableTrust: true,
          disableTags: true,
        },
      },
    ],
  };

  const result = new MetadataCallback(data).parse(0);
  expect(result).toEqual(new PingOneProtectInitializeCallback(data));
});

test('returns evaluation callback', () => {
  const data = {
    type: CallbackType.MetadataCallback,
    output: [
      {
        name: 'data',
        value: {
          _type: 'PingOneProtect',
          _action: 'protect_risk_evaluation',
          envId: 'some_id',
          pauseBehavioralData: true,
        },
      },
    ],
  };
  const result = new MetadataCallback(data).parse(0);
  expect(result).toEqual(new PingOneProtectInitializeCallback(data));
});

test('throws an error when index is passed out of range', () => {
  const data = {
    type: CallbackType.MetadataCallback,
    output: [
      {
        name: 'data',
        value: {
          _type: 'PingOneProtect',
          _action: 'protect_risk_evaluation',
          envId: 'some_id',
          pauseBehavioralData: true,
        },
      },
    ],
  };

  const callback = new MetadataCallback(data);

  // how to test for thrown error in vitest, needs cb
  expect(() => callback.parse(4)).toThrowError();
});

test('should grab value from array based on index', () => {
  const data = {
    type: CallbackType.HiddenValueCallback,
    output: [
      {
        name: 'something here',
        value: {},
      },
      {
        name: 'data',
        value: {
          _type: 'PingOneProtect',
          _action: 'protect_risk_evaluation',
          envId: 'some_id',
          pauseBehavioralData: true,
        },
      },
    ],
  };

  const result = new MetadataCallback(data).parse(1);

  // how to test for thrown error in vitest, needs cb
  expect(result).toEqual(new PingOneProtectEvaluationCallback(data));
});
