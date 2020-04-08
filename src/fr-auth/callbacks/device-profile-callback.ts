import FRCallback from '.';
import { Callback } from '../../auth/interfaces';
import { DeviceProfileData } from '../../fr-device/interfaces';

/**
 * Represents a callback used to collect device profile data.
 */
class DeviceProfileCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the callback's data.
   */
  public getMessage(): string {
    return this.getOutputByName<string>('message', '');
  }

  /**
   * Does callback require metadata?
   */
  public isMetadataRequired(): boolean {
    return this.getOutputByName<boolean>('metadata', false);
  }

  /**
   * Does callback require location data?
   */
  public isLocationRequired(): boolean {
    return this.getOutputByName<boolean>('location', false);
  }

  /**
   * Sets the profile.
   */
  public setProfile(profile: DeviceProfileData): void {
    this.setInputValue(JSON.stringify(profile));
  }
}

export default DeviceProfileCallback;
