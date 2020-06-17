import {
  expectedJsdom,
  expectedJsdomWithoutDisplay,
  expectedJsdomWithNarrowedBrowserProps,
} from './device-profile.mock.data';
import FRDevice from './index';

Object.defineProperty(window, 'crypto', {
  writable: true,
  value: {
    getRandomValues: jest.fn().mockImplementation(() => ['714524572', '2799534390', '3707617532']),
  },
});

describe('Test DeviceProfile', () => {
  it('should return basic metadata', async () => {
    const device = new FRDevice();
    const profile = await device.getProfile({ location: false, metadata: true });
    const userAgent = profile.metadata.browser.userAgent as string;
    const appName = profile.metadata.browser.appName as string;
    const appVersion = profile.metadata.browser.appVersion as string;
    const vendor = profile.metadata.browser.vendor as string;
    const display = profile.metadata.hardware.display;
    const deviceName = profile.metadata.platform.deviceName as string;
    expect(userAgent.includes('jsdom')).toBeTruthy();
    expect(appName).toBe('Netscape');
    expect(appVersion).toBe('4.0');
    expect(vendor).toBe('Apple Computer, Inc.');
    expect(display).toHaveProperty('width');
    expect(display).toHaveProperty('height');
    expect(deviceName.length).toBeGreaterThan(1);
  });

  it('should return metadata without any display props', async () => {
    const device = new FRDevice({ displayProps: [] });
    const profile = await device.getProfile({ location: false, metadata: true });
    const userAgent = profile.metadata.browser.userAgent as string;
    const display = profile.metadata.hardware.display;
    const deviceName = profile.metadata.platform.deviceName as string;
    expect(userAgent.length).toBeGreaterThan(1);
    expect(display.width).toBeFalsy();
    expect(display.height).toBeFalsy();
    expect(deviceName.length).toBeGreaterThan(1);
  });

  it('should return metadata according to narrowed browser props', async () => {
    const device = new FRDevice({ browserProps: ['userAgent'] });
    const profile = await device.getProfile({ location: false, metadata: true });
    const userAgent = profile.metadata.browser.userAgent as string;
    const appName = profile.metadata.browser.appName as string;
    const appVersion = profile.metadata.browser.appVersion as string;
    const vendor = profile.metadata.browser.vendor as string;
    const display = profile.metadata.hardware.display;
    const deviceName = profile.metadata.platform.deviceName as string;
    expect(userAgent.includes('jsdom')).toBeTruthy();
    expect(appName).toBeFalsy();
    expect(appVersion).toBeFalsy();
    expect(vendor).toBeFalsy();
    expect(display).toHaveProperty('width');
    expect(display).toHaveProperty('height');
    expect(deviceName.length).toBeGreaterThan(1);
  });
});
