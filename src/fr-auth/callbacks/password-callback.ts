import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect a password.
 */
class PasswordCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the callback's prompt.
   */
  public getPrompt(): string {
    return this.getOutputValue('prompt');
  }

  /**
   * Sets the password.
   */
  public setPassword(password: string) {
    this.setInputValue(password);
  }
}

export default PasswordCallback;
