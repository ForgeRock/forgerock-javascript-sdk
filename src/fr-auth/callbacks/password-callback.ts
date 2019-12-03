import FRCallback from '.';
import { Callback, PolicyRequirement } from '../../auth/interfaces';

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
   * Gets the callback's failed policies.
   */
  public getFailedPolicies(): PolicyRequirement[] {
    return this.getOutputByName<PolicyRequirement[]>('failedPolicies', []);
  }

  /**
   * Gets the callback's applicable policies.
   */
  public getPolicies(): string[] {
    return this.getOutputValue('policies');
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
