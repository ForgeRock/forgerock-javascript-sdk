import { vi, expect, describe, it } from 'vitest';
import { PIProtect } from './ping-protect';
import {
  noProtectType,
  standardPingProtectEvaluationStep,
  standardPingProtectInitializeStep,
} from './ping-protect.mock.data';
import { CallbackType, HiddenValueCallback } from '@forgerock/javascript-sdk';

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
  it('should call pause behavioralData', () => {
    const protectMock = vi.spyOn(PIProtect, 'pauseBehavioralData');
    PIProtect.pauseBehavioralData();
    expect(protectMock).toHaveBeenCalled();
  });
  it('should call resume behavioralData', () => {
    const protectMock = vi.spyOn(PIProtect, 'resumeBehavioralData');
    PIProtect.resumeBehavioralData();
    expect(protectMock).toHaveBeenCalled();
  });

  describe('should test the marketplace node setup', () => {
    it('should test getPauseBehavioralData with marketplace data', () => {
      const result = PIProtect.getPauseBehavioralData(standardPingProtectEvaluationStep);

      expect(result).toEqual(false);

      const secondResult = PIProtect.getPauseBehavioralData(standardPingProtectInitializeStep);

      expect(secondResult).toEqual(true);
    });
    it('should test the getPingProtectType method', () => {
      const result = PIProtect.getPingProtectType(standardPingProtectInitializeStep);

      expect(result).toEqual('initialize');

      const result2 = PIProtect.getPingProtectType(standardPingProtectEvaluationStep);

      expect(result2).toEqual('evaluate');

      const result3 = PIProtect.getPingProtectType(noProtectType);
      expect(result3).toEqual('none');
    });
    it('should setNodeInputValue', () => {
      const step = standardPingProtectEvaluationStep;

      PIProtect.setNodeInputValue(step, 'the value');
      const [hc] = step.getCallbacksOfType<HiddenValueCallback>(CallbackType.HiddenValueCallback);

      expect(hc.getInputValue()).toEqual('the value');
    });
  });

  it('should get the node config', () => {
    const result = PIProtect.getNodeConfig(standardPingProtectInitializeStep);
    expect(result).toEqual(
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      standardPingProtectInitializeStep!.payload.callbacks![0].output[0].value,
    );

    const result2 = PIProtect.getNodeConfig(noProtectType);
    expect(result2).toBeUndefined();
  });
  it('should set an error with marketplace nodes', () => {
    PIProtect.setNodeClientError(standardPingProtectEvaluationStep, 'we errored!');

    const [, err] = standardPingProtectEvaluationStep.getCallbacksOfType<HiddenValueCallback>(
      CallbackType.HiddenValueCallback,
    );

    expect(err.getInputValue()).toBe('we errored!');
  });
});
