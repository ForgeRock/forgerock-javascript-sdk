import FRCallback from '.';
import { Callback, PolicyRequirement } from '../../auth/interfaces';
import { StringDict } from '../../shared/interfaces';

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
    return this.getOutputByName<string>('prompt', '');
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
  public getPolicies(): StringDict<any> {
    return this.getOutputByName<StringDict<any>>('policies', {});
  }

  /**
   * Gets whether the username is required.
   */
  public isRequired(): boolean {
    return this.getOutputByName<boolean>('required', false);
  }

  /**
   * Sets the callback's username.
   */
  public setName(name: string): void {
    this.setInputValue(name);
  }

  /**
   * Set if validating value only.
   */
  public setValidateOnly(value: boolean): void {
    this.setInputValue(value, /validateOnly/);
  }
}

export default ValidatedCreateUsernameCallback;
