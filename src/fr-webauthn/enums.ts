/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

enum WebAuthnOutcome {
  Error = 'ERROR',
  Unsupported = 'unsupported',
}

enum WebAuthnStepType {
  None = 0,
  Authentication = 1,
  Registration = 2,
}

export { WebAuthnOutcome, WebAuthnStepType };
