/*
 * angular-todo-prototype
 *
 * eye-icon.component.ts
 *
 * Copyright (c) 2021 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-eye-icon',
  templateUrl: './eye-icon.component.html',
})
export class EyeIconComponent {
  @Input() visible: boolean = true;
  @Input() size: string = '24px';
}
