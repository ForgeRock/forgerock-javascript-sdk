import { vi, expect, test, describe, it } from 'vitest';
import { PIProtect } from './ping-protect';
import {
  standardPingProtectEvaluationStep,
  standardPingProtectInitializeStep,
} from './test/mock-data';

test('returns initializeCallback', () => {
  const step = standardPingProtectInitializeStep;

  const result = PIProtect.handlePingMarketplaceNodes(step);
  expect(result).toHaveProperty('clientError');
  expect(result).toHaveProperty('metadataCallback');
  expect(result).not.toHaveProperty('input');
});

test('returns evaluation callback', () => {
  const step = standardPingProtectEvaluationStep;

  const result = PIProtect.handlePingMarketplaceNodes(step);

  expect(result).toHaveProperty('clientError');
  expect(result).toHaveProperty('metadataCallback');
  expect(result).toHaveProperty('input');
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
});
