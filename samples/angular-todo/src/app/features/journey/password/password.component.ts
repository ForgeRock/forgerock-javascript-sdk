/*
 * angular-todo-prototype
 *
 * password.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PasswordCallback, ValidatedCreatePasswordCallback } from '@forgerock/javascript-sdk';

/**
 * Used to collect or set a password
 */
@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
})
export class PasswordComponent implements OnInit {
  /**
   * The callback to be represented as either a password challenge or password set field
   */
  @Input() callback?: PasswordCallback | ValidatedCreatePasswordCallback;

  /**
   * The name of the callback
   */
  @Input() name?: string;

  /**
   * Emits a string representing the password entered by the user
   */
  @Output() updatedCallback = new EventEmitter<string>();

  /**
   * Is password to be shown in clear text
   */
  isVisible = false;

  /**
   * Is the password a required field in the form
   */
  isRequired = false;

  /**
   * Validation error messages
   */
  failureMessages: string[] = [];

  /**
   * Initialise any failure messages and whether this field is mandatory
   */
  ngOnInit(): void {
    this.isRequired = this.getIsRequired(this.callback);
    this.failureMessages = this.evaluateFailedPolicies(this.callback);
  }

  /**
   * Emit an event to the parent component, passing the password entered
   * @param event - the value of the password field
   */
  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }

  /**
   * Toggle the password from masked to plaintext
   */
  toggleVisibility(): void {
    this.isVisible = !this.isVisible;
  }

  /**
   * Determines whether this field is mandatory
   * @param callback - the password callback to be evaluated
   * @returns boolean - is this field mandatory
   */
  getIsRequired(callback?: PasswordCallback | ValidatedCreatePasswordCallback): boolean {
    if (callback === undefined || callback instanceof PasswordCallback) return false;

    const policies = callback.getPolicies();

    if (policies.policyRequirements) {
      return policies.policyRequirements.includes('REQUIRED');
    } else if (callback?.isRequired) {
      return callback.isRequired();
    }

    return false;
  }

  /**
   * Process password policy feedback from AM
   * @param callback - the password callback to be evaluated
   * @returns string[] - an array of password policy failures
   */
  evaluateFailedPolicies(callback?: PasswordCallback | ValidatedCreatePasswordCallback): string[] {
    if (callback === undefined || callback instanceof PasswordCallback) return [];

    const failedPolicies = callback.getFailedPolicies();

    const validationFailures: string[] = [];

    failedPolicies.forEach((policy) => {
      const policyObj = JSON.parse(JSON.parse(JSON.stringify(policy)));

      console.log(policyObj.policyRequirement);

      switch (policyObj.policyRequirement) {
        case 'LENGTH_BASED':
          validationFailures.push(
            `Ensure password contains more than ${policyObj.params['min-password-length']} characters. `,
          );
          break;
        case 'CHARACTER_SET':
          validationFailures.push(
            `Ensure password contains 1 of each: capital letter, number and special character. `,
          );
          break;
        default:
          break;
      }
    });
    return validationFailures;
  }
}
