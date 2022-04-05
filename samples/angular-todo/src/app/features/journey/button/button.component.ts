/*
 * angular-todo-prototype
 *
 * button.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input } from '@angular/core';

/**
 * Displays a button to submit the form
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  /**
   * The text to be displayed on the button
   */
  @Input() buttonText?: string;

  /**
   * Whether the form is currently being submitted and a spinner should be displayed
   */
  @Input() submittingForm?: boolean;
}
