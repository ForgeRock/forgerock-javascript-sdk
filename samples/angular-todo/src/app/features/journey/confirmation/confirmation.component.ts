/*
 * angular-todo-prototype
 *
 * confirmation.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationCallback } from '@forgerock/javascript-sdk';

/**
 * Used to display login options
 */
@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
})
export class ConfirmationComponent {
  /**
   * The callback to be represented as a confirmation to a message.
   */
  @Input() callback?: ConfirmationCallback;

  /**
   * The name of the callback
   */
  @Input() name?: string;

  /**
   * Emits a boolean representing the updated state of the checkbox
   */
  @Output() updatedCallback = new EventEmitter<string>();

  onSetOptionValue(optionValue: Event): void {
    this.updatedCallback.emit((optionValue.target as HTMLInputElement).value);
  }
}
