import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect a comfirmation to a message.
 */
class ConfirmationCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the index position of the confirmation's default answer.
   */
  public getDefaultOption(): number {
    return Number(this.getOutputValue('defaultOption'));
  }

  /**
   * Gets the confirmation's message type.
   */
  public getMessageType(): number {
    return Number(this.getOutputValue('messageType'));
  }

  /**
   * Gets the confirmation's possible answers.
   */
  public getOptions(): string[] {
    return this.getOutputValue('options');
  }

  /**
   * Gets the confirmation's option type.
   */
  public getOptionType(): number {
    return Number(this.getOutputValue('optionType'));
  }

  /**
   * Gets the confirmation's prompt.
   */
  public getPrompt(): string {
    return this.getOutputValue('prompt');
  }
}

export default ConfirmationCallback;
