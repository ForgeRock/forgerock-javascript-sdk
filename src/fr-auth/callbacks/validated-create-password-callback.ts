import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect a valid platform password.
 */
class ValidatedCreatePasswordCallback extends FRCallback {
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
   * Gets whether the password is required.
   */
  public isRequired(): boolean {
    return this.getOutputValue('required');
  }

  /**
   * Gets the password policy keys.
   */
  public getPolicyKeys(): string[] {
    return this.getOutputValue('policies');
  }

  /**
   * Gets the password policy keys that are not satisfied.
   */
  public getFailedPolicyKeys(): string[] {
    return this.getOutputValue('failedPolicies');
  }

  /**
   * Sets the callback's password.
   */
  public setPassword(password: string) {
    this.setInputValue(password);
  }
}

export default ValidatedCreatePasswordCallback;
