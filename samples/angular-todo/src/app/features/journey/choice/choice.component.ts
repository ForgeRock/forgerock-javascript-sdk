/*
 * angular-todo-prototype
 *
 * choice.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ChoiceCallback } from '@forgerock/javascript-sdk';

/**
 * Used to display a series of choices and allow the user to select one
 */
@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
})
export class ChoiceComponent {
  /**
   * The callback to be represented as select input
   */
  @Input() callback?: ChoiceCallback;

  /**
   * The name of the callback
   */
  @Input() name?: string;

  /**
   * Emits a string representing the value of the selected choice
   */
  @Output() updatedCallback = new EventEmitter<string>();

  /**
   * Emit an event to the parent component, passing the selected choice
   * @param event - the choice selected
   */
  setValue(event: any): void {
    this.updatedCallback.emit(event.target.value);
  }
}
