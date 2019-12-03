import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect acceptance of terms and conditions.
 */
class TermsAndConditionsCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the terms and conditions content.
   */
  public getTerms(): string {
    return this.getOutputValue('terms');
  }

  /**
   * Gets the version of the terms and conditions.
   */
  public getVersion(): string {
    return this.getOutputValue('version');
  }

  /**
   * Gets the date of the terms and conditions.
   */
  public getCreateDate(): Date {
    return new Date(this.getOutputValue('createDate'));
  }

  /**
   * Sets the callback's acceptance.
   */
  public setAccepted(accepted = true) {
    this.setInputValue(accepted);
  }
}

export default TermsAndConditionsCallback;
