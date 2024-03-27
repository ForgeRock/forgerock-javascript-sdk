import { describe, it } from 'vitest';
import { PIProtect } from './ping-protect';

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
