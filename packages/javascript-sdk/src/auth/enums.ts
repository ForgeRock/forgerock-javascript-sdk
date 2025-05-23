/*
 * @forgerock/javascript-sdk
 *
 * enums.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * Known errors that can occur during authentication.
 */
enum ErrorCode {
  BadRequest = 'BAD_REQUEST',
  Timeout = 'TIMEOUT',
  Unauthorized = 'UNAUTHORIZED',
  Unknown = 'UNKNOWN',
}

/**
 * Types of callbacks directly supported by the SDK.
 */
enum CallbackType {
  BooleanAttributeInputCallback = 'BooleanAttributeInputCallback',
  ChoiceCallback = 'ChoiceCallback',
  ConfirmationCallback = 'ConfirmationCallback',
  DeviceProfileCallback = 'DeviceProfileCallback',
  HiddenValueCallback = 'HiddenValueCallback',
  KbaCreateCallback = 'KbaCreateCallback',
  MetadataCallback = 'MetadataCallback',
  NameCallback = 'NameCallback',
  NumberAttributeInputCallback = 'NumberAttributeInputCallback',
  PasswordCallback = 'PasswordCallback',
  PingOneProtectEvaluationCallback = 'PingOneProtectEvaluationCallback',
  PingOneProtectInitializeCallback = 'PingOneProtectInitializeCallback',
  PollingWaitCallback = 'PollingWaitCallback',
  ReCaptchaCallback = 'ReCaptchaCallback',
  ReCaptchaEnterpriseCallback = 'ReCaptchaEnterpriseCallback',
  RedirectCallback = 'RedirectCallback',
  SelectIdPCallback = 'SelectIdPCallback',
  StringAttributeInputCallback = 'StringAttributeInputCallback',
  SuspendedTextOutputCallback = 'SuspendedTextOutputCallback',
  TermsAndConditionsCallback = 'TermsAndConditionsCallback',
  TextInputCallback = 'TextInputCallback',
  TextOutputCallback = 'TextOutputCallback',
  ValidatedCreatePasswordCallback = 'ValidatedCreatePasswordCallback',
  ValidatedCreateUsernameCallback = 'ValidatedCreateUsernameCallback',
}

export { CallbackType, ErrorCode };
