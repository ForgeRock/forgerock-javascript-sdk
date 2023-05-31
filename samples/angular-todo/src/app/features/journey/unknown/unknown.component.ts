/*
 * angular-todo-prototype
 *
 * unknown.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input } from '@angular/core';
import { FRCallback } from '@forgerock/javascript-sdk';

/**
 * Used to display a message if there is an unknown callback
 */
@Component({
  selector: 'app-unknown',
  templateUrl: './unknown.component.html',
})
export class UnknownComponent {
  /**
   * The callback that is of an unknown type
   */
  @Input() callback?: FRCallback;
}
