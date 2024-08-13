import { expect, test, describe, it } from 'vitest';
import { PIProtect } from './ping-protect';
import {
  Callback,
  CallbackType,
  PingOneProtectEvaluationCallback,
  PingOneProtectInitializeCallback,
  MetadataCallback,
} from '@forgerock/javascript-sdk';

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
  const cb = new MetadataCallback(data);
  const result = PIProtect.getDerivedCallback(cb, 0);

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

  const cb = new MetadataCallback(data);
  const result = PIProtect.getDerivedCallback(cb, 0);

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

  const cb = new MetadataCallback(data);
  const result = PIProtect.getDerivedCallback(cb, 0);

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
  expect(() => PIProtect.getDerivedCallback(callback, 4)).toThrowError();
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

  const cb = new MetadataCallback(data);
  const result = PIProtect.getDerivedCallback(cb, 1);

  // how to test for thrown error in vitest, needs cb
  expect(result).toEqual(new PingOneProtectEvaluationCallback(data));
});

describe('PIProtect', () => {
  it('should be defined', () => {
    expect(PIProtect).toBeDefined();
    expect(PIProtect.start).toBeDefined();
    expect(PIProtect.getData).toBeDefined();
    expect(PIProtect.pauseBehavioralData).toBeDefined();
    expect(PIProtect.resumeBehavioralData).toBeDefined();
  });
  it('should call start', async () => {
    const protectMock = vi.spyOn(PIProtect, 'start');
    const config = {
      envId: '12345',
      consoleLogEnabled: true,
      deviceAttributesToIgnore: ['userAgent'],
      customHost: 'https://example.com',
      lazyMetadata: false,
      behavioralDataCollection: true,
      deviceKeyRsyncIntervals: 14,
      enableTrust: false,
      disableTags: false,
      disableHub: false,
    };
    await PIProtect.start(config);
    expect(protectMock).toHaveBeenCalledWith(config);
  });
  it('should call pause behavioralData', async () => {
    const protectMock = vi.spyOn(PIProtect, 'pauseBehavioralData');
    await PIProtect.pauseBehavioralData();
    expect(protectMock).toHaveBeenCalled();
  });
  it('should call resume behavioralData', async () => {
    const protectMock = vi.spyOn(PIProtect, 'resumeBehavioralData');
    await PIProtect.resumeBehavioralData();
    expect(protectMock).toHaveBeenCalled();
  });
});
