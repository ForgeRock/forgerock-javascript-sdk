/*
 * angular-todo-prototype
 *
 * left-arrow-icon.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-left-arrow-icon',
  templateUrl: './left-arrow-icon.component.html',
})
export class LeftArrowIconComponent {
  @Input() size = '24px';
}
