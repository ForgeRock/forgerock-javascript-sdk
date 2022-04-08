/*
 * angular-todo-prototype
 *
 * text.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  AttributeInputCallback,
  NameCallback,
  ValidatedCreateUsernameCallback,
} from '@forgerock/javascript-sdk';

/**
 * Used to collect a username, email address or any other text
 */
@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
})
export class TextComponent implements OnInit {
  /**
   * The callback to be represented as a username, create username, or text input field
   */
  @Input() callback?:
    | NameCallback
    | ValidatedCreateUsernameCallback
    | AttributeInputCallback<string>;

  /**
   * The name of the callback
   */
  @Input() name?: string;

  /**
   * Emits a string representing the text entered by the user
   */
  @Output() updatedCallback = new EventEmitter<string>();

  /**
   * Is the text a required field in the form
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
   * Emit an event to the parent component, passing the text entered
   * @param event - the value of the text field
   */
  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }

  /**
   * Determines whether this field is mandatory
   * @param callback - the text callback to be evaluated
   * @returns boolean - is this field mandatory
   */
  getIsRequired(
    callback?: NameCallback | ValidatedCreateUsernameCallback | AttributeInputCallback<string>,
  ): boolean {
    if (
      callback === undefined ||
      callback instanceof NameCallback ||
      callback.getType() === 'NameCallback'
    )
      return false;

    const policies = callback.getPolicies();

    if (callback.getType() === 'ValidatedCreateUsernameCallback') {
      return policies.policyRequirements.includes('REQUIRED');
    } else {
      return callback.isRequired();
    }
  }

  /**
   * Process text policy feedback from AM
   * @param callback - the text callback to be evaluated
   * @returns string[] - an array of password policy failures
   */
  evaluateFailedPolicies(
    callback?: NameCallback | ValidatedCreateUsernameCallback | AttributeInputCallback<string>,
  ): string[] {
    if (
      callback === undefined ||
      callback instanceof NameCallback ||
      callback.getType() === 'NameCallback'
    )
      return [];

    const failedPolicies = callback.getFailedPolicies();

    const validationFailures: string[] = [];

    failedPolicies.forEach((policy) => {
      const policyObj = JSON.parse(JSON.parse(JSON.stringify(policy)));

      switch (policyObj.policyRequirement) {
        case 'VALID_USERNAME':
          validationFailures.push('Please choose a different username');
          break;
        case 'VALID_EMAIL_ADDRESS_FORMAT':
          validationFailures.push('Please use a valid email address');
          break;
        default:
          break;
      }
    });
    return validationFailures;
  }
}
