/*
 * angular-todo-prototype
 *
 * alert.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input } from '@angular/core';

/**
 * Used for displaying for errors
 */
@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
})
export class AlertComponent {
  /**
   * Determines whether this is an error or success alert
   */
  @Input() type?: string;

  /**
   * The message to display
   */
  @Input() message?: string;
}
