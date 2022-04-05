/*
 * angular-todo-prototype
 *
 * terms-conditions.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TermsAndConditionsCallback } from '@forgerock/javascript-sdk';

/**
 * Used to display terms and conditions, and collect the user's acceptance
 */
@Component({
  selector: 'app-terms-conditions',
  templateUrl: './terms-conditions.component.html',
})
export class TermsConditionsComponent {
  /**
   * The callback to be represented as terms and conditions
   */
  @Input() callback?: TermsAndConditionsCallback;

  /**
   * The name of the callback
   */
  @Input() name?: string;

  /**
   * Emits a boolean representing the updated state of the checkbox
   */
  @Output() updatedCallback = new EventEmitter<boolean>();

  /**
   * Emit an event to the parent component, passing the acceptance of the terms and conditions
   * @param event - the acceptance of the terms and conditions
   */
  updateValue(event: any): void {
    this.updatedCallback.emit(event.target.checked);
  }
}
