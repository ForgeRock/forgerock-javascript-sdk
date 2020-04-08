import {
  expectedJsdom,
  expectedJsdomWithoutDisplay,
  expectedJsdomWithNarrowedBrowserProps,
} from './device-profile.mock.data';
import FRDevice from './index';

describe('Test DeviceProfile', () => {
  it('should return basic metadata', async () => {
    const device = new FRDevice();
    const profile = await device.getProfile({ location: false, metadata: true });
    expect(profile).toStrictEqual(expectedJsdom);
  });

  it('should return metadata without any display props', async () => {
    const device = new FRDevice({ displayProps: [] });
    const profile = await device.getProfile({ location: false, metadata: true });
    expect(profile).toStrictEqual(expectedJsdomWithoutDisplay);
  });

  it('should return metadata according to narrowed browser props', async () => {
    const device = new FRDevice({ browserProps: ['userAgent'] });
    const profile = await device.getProfile({ location: false, metadata: true });
    expect(profile).toStrictEqual(expectedJsdomWithNarrowedBrowserProps);
  });
});
