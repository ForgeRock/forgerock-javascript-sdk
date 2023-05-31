/*
 * angular-todo-prototype
 *
 * boolean.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AttributeInputCallback } from '@forgerock/javascript-sdk';

/**
 * Used to display checkboxes
 */
@Component({
  selector: 'app-boolean',
  templateUrl: './boolean.component.html',
})
export class BooleanComponent {
  /**
   * The callback to be represented as a checkbox
   */
  @Input() callback?: AttributeInputCallback<boolean>;

  /**
   * The name of the callback
   */
  @Input() name?: string;

  /**
   * Emits a boolean representing the updated state of the checkbox
   */
  @Output() updatedCallback = new EventEmitter<boolean>();

  /**
   * Emit an event to the parent component, passing the updated value of the checkbox
   * @param event - the updated value of the checkbox
   */
  updateValue(event: any): void {
    this.updatedCallback.emit(event.currentTarget.checked);
  }
}
