import FRCallback from '.';
import { Callback, PolicyRequirement } from '../../auth/interfaces';

/**
 * Represents a callback used to collect a valid platform username.
 */
class ValidatedCreateUsernameCallback extends FRCallback {
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
   * Gets whether the username is required.
   */
  public isRequired(): boolean {
    return this.getOutputValue('required');
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
   * Sets the callback's username.
   */
  public setName(name: string) {
    this.setInputValue(name);
  }
}

export default ValidatedCreateUsernameCallback;
