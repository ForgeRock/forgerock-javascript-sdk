import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to deliver and collect miscellaneous data.
 */
class MetadataCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the callback's data.
   */
  public getData<T>(): T {
    return this.getOutputValue('data');
  }
}

export default MetadataCallback;
