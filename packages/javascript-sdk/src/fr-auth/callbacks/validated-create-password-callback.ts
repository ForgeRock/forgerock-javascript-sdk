/*
 * @forgerock/javascript-sdk
 *
 * validated-create-password-callback.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import FRCallback from '.';
import type { Callback, PolicyRequirement } from '../../auth/interfaces';
import type { StringDict } from '../../shared/interfaces';

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
   * Gets the callback's failed policies.
   */
  public getFailedPolicies(): PolicyRequirement[] {
    const failedPolicies = this.getOutputByName<PolicyRequirement[]>(
      'failedPolicies',
      [],
    ) as unknown as string[];
    try {
      return failedPolicies.map((v) => JSON.parse(v)) as PolicyRequirement[];
    } catch (err) {
      throw new Error(
        'Unable to parse "failed policies" from the ForgeRock server. The JSON within `ValidatedCreatePasswordCallback` was either malformed or missing.',
      );
    }
  }

  /**
   * Gets the callback's applicable policies.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public getPolicies(): StringDict<any> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.getOutputByName<StringDict<any>>('policies', {});
  }

  /**
   * Gets the callback's prompt.
   */
  public getPrompt(): string {
    return this.getOutputByName<string>('prompt', '');
  }

  /**
   * Gets whether the password is required.
   */
  public isRequired(): boolean {
    return this.getOutputByName<boolean>('required', false);
  }

  /**
   * Sets the callback's password.
   */
  public setPassword(password: string): void {
    this.setInputValue(password);
  }

  /**
   * Set if validating value only.
   */
  public setValidateOnly(value: boolean): void {
    this.setInputValue(value, /validateOnly/);
  }
}

export default ValidatedCreatePasswordCallback;
