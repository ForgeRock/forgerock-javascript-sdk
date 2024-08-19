import { expect, test, describe, it } from 'vitest';
import { PIProtect } from './ping-protect';
import {
  CallbackType,
  PingOneProtectInitializeCallback,
  MetadataCallback,
  FRStep,
} from '@forgerock/javascript-sdk';

test('returns metadata if no type matches', () => {
  const step = new FRStep({
    callbacks: [
      {
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
      },
    ],
  });

  const result = PIProtect.getDerivedCallback(step);

  expect(result).toEqual(new MetadataCallback(step.callbacks[0].payload));
});

test('returns initializeCallback', () => {
  const step = new FRStep({
    authId: 'foo',
    callbacks: [
      {
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
      },
    ],
  });

  const result = PIProtect.getDerivedCallback(step);
  expect(result).toEqual(new PingOneProtectInitializeCallback(step.callbacks[0].payload));
});

test('returns evaluation callback', () => {
  const step = new FRStep({
    authId: 'foo',
    callbacks: [
      {
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
      },
    ],
  });

  const result = PIProtect.getDerivedCallback(step);

  expect(result).toEqual(new PingOneProtectInitializeCallback(step.callbacks[0].payload));
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
