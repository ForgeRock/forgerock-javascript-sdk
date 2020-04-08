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
  PasswordCallback = 'PasswordCallback',
  PollingWaitCallback = 'PollingWaitCallback',
  ReCaptchaCallback = 'ReCaptchaCallback',
  StringAttributeInputCallback = 'StringAttributeInputCallback',
  TermsAndConditionsCallback = 'TermsAndConditionsCallback',
  TextOutputCallback = 'TextOutputCallback',
  ValidatedCreatePasswordCallback = 'ValidatedCreatePasswordCallback',
  ValidatedCreateUsernameCallback = 'ValidatedCreateUsernameCallback',
}

export { CallbackType, ErrorCode };
