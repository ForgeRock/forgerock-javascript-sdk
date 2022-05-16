/**
 * Represents a name/value pair found in an authentication tree callback.
 */
export interface NameValue {
  name: string;
  value: unknown;
}

/**
 * Types of callbacks directly supported by the SDK.
 */
export enum CallbackType {
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
  PollingWaitCallback = 'PollingWaitCallback',
  ReCaptchaCallback = 'ReCaptchaCallback',
  RedirectCallback = 'RedirectCallback',
  SelectIdPCallback = 'SelectIdPCallback',
  StringAttributeInputCallback = 'StringAttributeInputCallback',
  SuspendedTextOutputCallback = 'SuspendedTextOutputCallback',
  TermsAndConditionsCallback = 'TermsAndConditionsCallback',
  TextOutputCallback = 'TextOutputCallback',
  ValidatedCreatePasswordCallback = 'ValidatedCreatePasswordCallback',
  ValidatedCreateUsernameCallback = 'ValidatedCreateUsernameCallback',
}
/**
 * Represents the authentication tree API callback schema.
 */
export interface Callback {
  _id?: number;
  input?: NameValue[];
  output: NameValue[];
  type: CallbackType;
}
