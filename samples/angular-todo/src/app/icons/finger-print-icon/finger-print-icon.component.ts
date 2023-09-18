/*
 * angular-todo-prototype
 *
 * finger-print-icon.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-finger-print-icon',
  templateUrl: './finger-print-icon.component.html',
})
export class FingerPrintIconComponent {
  @Input() size = '72px';
}
