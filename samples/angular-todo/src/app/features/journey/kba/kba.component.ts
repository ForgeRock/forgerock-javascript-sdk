/*
 * angular-todo-prototype
 *
 * kba.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { KbaCreateCallback } from '@forgerock/javascript-sdk';

/**
 * Used to display a KBA security question
 */
@Component({
  selector: 'app-kba',
  templateUrl: './kba.component.html',
})
export class KbaComponent {
  /**
   * The callback to be represented as a KBA security question
   */
  @Input() callback?: KbaCreateCallback;

  /**
   * The name of the callback
   */
  @Input() name?: string;

  /**
   * Emits a string representing the selected question
   */
  @Output() setQuestion = new EventEmitter<string>();

  /**
   * Emits a string representing the answer entered
   */
  @Output() setAnswer = new EventEmitter<string>();

  /**
   * Emit an event to the parent component, passing the selected question
   * @param event - the question
   */
  questionSet(event: any): void {
    this.setQuestion.emit(event.target.value);
  }

  /**
   * Emit an event to the parent component, passing the answer entered
   * @param event - the answer
   */
  answerSet(event: any): void {
    this.setAnswer.emit(event.target.value);
  }
}
