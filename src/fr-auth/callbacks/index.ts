/*
 * @forgerock/javascript-sdk
 *
 * index.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Callback, NameValue } from '../../auth/interfaces';

/**
 * Base class for authentication tree callback wrappers.
 */
class FRCallback {
  /**
   * @param payload The raw payload returned by OpenAM
   */
  constructor(public payload: Callback) {}

  /**
   * Gets the name of this callback type.
   */
  public getType(): string {
    return this.payload.type;
  }

  /**
   * Gets the value of the specified input element, or the first element if `selector` is not
   * provided.
   *
   * @param selector The index position or name of the desired element
   */
  public getInputValue(selector: number | string = 0): unknown {
    return this.getArrayElement(this.payload.input, selector).value;
  }

  /**
   * Sets the value of the specified input element, or the first element if `selector` is not
   * provided.
   *
   * @param selector The index position or name of the desired element
   */
  public setInputValue(value: unknown, selector: number | string | RegExp = 0): void {
    this.getArrayElement(this.payload.input, selector).value = value;
  }

  /**
   * Gets the value of the specified output element, or the first element if `selector`
   * is not provided.
   *
   * @param selector The index position or name of the desired element
   */
  public getOutputValue(selector: number | string = 0): unknown {
    return this.getArrayElement(this.payload.output, selector).value;
  }

  /**
   * Gets the value of the first output element with the specified name or the
   * specified default value.
   *
   * @param name The name of the desired element
   */
  public getOutputByName<T>(name: string, defaultValue: T): T {
    const output = this.payload.output.find((x) => x.name === name);
    return output ? (output.value as T) : defaultValue;
  }

  private getArrayElement(
    array: NameValue[] | undefined,
    selector: number | string | RegExp = 0,
  ): NameValue {
    if (array === undefined) {
      throw new Error(`No NameValue array was provided to search (selector ${selector})`);
    }

    if (typeof selector === 'number') {
      if (selector < 0 || selector > array.length - 1) {
        throw new Error(`Selector index ${selector} is out of range`);
      }
      return array[selector];
    }

    if (typeof selector === 'string') {
      const input = array.find((x) => x.name === selector);
      if (!input) {
        throw new Error(`Missing callback input entry "${selector}"`);
      }
      return input;
    }

    // Duck typing for RegEx
    if (typeof selector === 'object' && selector.test && selector.exec) {
      const input = array.find((x) => selector.test(x.name));
      if (!input) {
        throw new Error(`Missing callback input entry "${selector}"`);
      }
      return input;
    }

    throw new Error('Invalid selector value type');
  }
}

export default FRCallback;
