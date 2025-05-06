/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * Types of steps returned by the authentication tree.
 */
enum StepType {
  LoginFailure = 'LoginFailure',
  LoginSuccess = 'LoginSuccess',
  Step = 'Step',
}

export { StepType };
