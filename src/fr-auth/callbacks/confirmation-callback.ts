/*
 * @forgerock/javascript-sdk
 *
 * confirmation-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect a confirmation to a message.
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
    return Number(this.getOutputByName<number>('defaultOption', 0));
  }

  /**
   * Gets the confirmation's message type.
   */
  public getMessageType(): number {
    return Number(this.getOutputByName<number>('messageType', 0));
  }

  /**
   * Gets the confirmation's possible answers.
   */
  public getOptions(): string[] {
    return this.getOutputByName<string[]>('options', []);
  }

  /**
   * Gets the confirmation's option type.
   */
  public getOptionType(): number {
    return Number(this.getOutputByName<number>('optionType', 0));
  }

  /**
   * Gets the confirmation's prompt.
   */
  public getPrompt(): string {
    return this.getOutputByName<string>('prompt', '');
  }

  /**
   * Set option index.
   */
  public setOptionIndex(index: number): void {
    if (index !== 0 && index !== 1) {
      throw new Error(`"${index}" is not a valid choice`);
    }
    this.setInputValue(index);
  }

  /**
   * Set option value.
   */
  public setOptionValue(value: string): void {
    const index = this.getOptions().indexOf(value);
    if (index === -1) {
      throw new Error(`"${value}" is not a valid choice`);
    }
    this.setInputValue(index);
  }
}

export default ConfirmationCallback;
