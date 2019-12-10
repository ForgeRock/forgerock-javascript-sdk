import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to display a message.
 */
class TextOutputCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the message content.
   */
  public getMessage(): string {
    return this.getOutputByName<string>('message', '');
  }

  /**
   * Gets the message type.
   */
  public getMessageType(): string {
    return this.getOutputByName<string>('messageType', '');
  }
}

export default TextOutputCallback;
