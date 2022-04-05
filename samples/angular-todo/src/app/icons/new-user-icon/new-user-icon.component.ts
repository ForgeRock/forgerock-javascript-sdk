/*
 * angular-todo-prototype
 *
 * new-user-icon.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-new-user-icon',
  templateUrl: './new-user-icon.component.html',
})
export class NewUserIconComponent {
  @Input() size = '24px';
}
