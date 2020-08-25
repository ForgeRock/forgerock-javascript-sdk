import TextOutputCallback from './text-output-callback';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to display a message.
 */
class SuspendedTextOutputCallback extends TextOutputCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }
}

export default SuspendedTextOutputCallback;
