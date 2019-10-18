import FRCallback from '..';
import { Callback } from '../../../auth/interfaces';

/**
 * Represents a callback used to collect attributes.
 *
 * @typeparam T Maps to StringAttributeInputCallback and BooleanAttributeInputCallback, respectively
 */
class AttributeInputCallback<T extends string | boolean> extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the attribute name.
   */
  public getName(): string {
    return this.getOutputValue('name');
  }

  /**
   * Gets the attribute prompt.
   */
  public getPrompt(): string {
    return this.getOutputValue('prompt');
  }

  /**
   * Gets whether the attribute is required.
   */
  public isRequired(): boolean {
    return this.getOutputValue('required');
  }

  /**
   * Gets the attribute policy keys.
   */
  public getPolicyKeys(): string[] {
    return this.getOutputValue('policies');
  }

  /**
   * Gets the attribute policy keys that are not satisfied.
   */
  public getFailedPolicyKeys(): string[] {
    return this.getOutputValue('failedPolicies');
  }

  /**
   * Sets the attribute's value.
   */
  public setValue(value: T) {
    this.setInputValue(value);
  }
}

export default AttributeInputCallback;
