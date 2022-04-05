/*
 * angular-todo-prototype
 *
 * forgerock-icon.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-forgerock-icon',
  templateUrl: './forgerock-icon.component.html',
})
export class ForgerockIconComponent {
  @Input() size = '24px';
}
