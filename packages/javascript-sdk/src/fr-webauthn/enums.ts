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

enum WebAuthnOutcomeType {
  AbortError = 'AbortError',
  DataError = 'DataError',
  ConstraintError = 'ConstraintError',
  EncodingError = 'EncodingError',
  InvalidError = 'InvalidError',
  NetworkError = 'NetworkError',
  NotAllowedError = 'NotAllowedError',
  NotSupportedError = 'NotSupportedError',
  SecurityError = 'SecurityError',
  TimeoutError = 'TimeoutError',
  UnknownError = 'UnknownError',
}

enum WebAuthnStepType {
  None = 0,
  Authentication = 1,
  Registration = 2,
}

export { WebAuthnOutcome, WebAuthnOutcomeType, WebAuthnStepType };
