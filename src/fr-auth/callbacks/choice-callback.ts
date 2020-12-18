/*
 * @forgerock/javascript-sdk
 *
 * choice-callback.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import { Callback } from '../../auth/interfaces';

/**
 * Represents a callback used to collect an answer to a choice.
 */
class ChoiceCallback extends FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {
    super(payload);
  }

  /**
   * Gets the choice's prompt.
   */
  public getPrompt(): string {
    return this.getOutputByName<string>('prompt', '');
  }

  /**
   * Gets the choice's default answer.
   */
  public getDefaultChoice(): number {
    return this.getOutputByName<number>('defaultChoice', 0);
  }

  /**
   * Gets the choice's possible answers.
   */
  public getChoices(): string[] {
    return this.getOutputByName<string[]>('choices', []);
  }

  /**
   * Sets the choice's answer by index position.
   */
  public setChoiceIndex(index: number): void {
    const length = this.getChoices().length;
    if (index < 0 || index > length - 1) {
      throw new Error(`${index} is out of bounds`);
    }
    this.setInputValue(index);
  }

  /**
   * Sets the choice's answer by value.
   */
  public setChoiceValue(value: string): void {
    const index = this.getChoices().indexOf(value);
    if (index === -1) {
      throw new Error(`"${value}" is not a valid choice`);
    }
    this.setInputValue(index);
  }
}

export default ChoiceCallback;
