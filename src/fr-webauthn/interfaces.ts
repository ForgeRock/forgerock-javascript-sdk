import HiddenValueCallback from '../fr-auth/callbacks/hidden-value-callback';
import MetadataCallback from '../fr-auth/callbacks/metadata-callback';
import TextOutputCallback from 'fr-auth/callbacks/text-output-callback';

enum AttestationType {
  Direct = 'direct',
  Indirect = 'indirect',
  None = 'none',
}

interface DeviceStepState extends StepState {
  value1: number;
  value2: number;
}

enum UserVerificationType {
  Discouraged = 'discouraged',
  Preferred = 'preferred',
  Required = 'required',
}

interface RelyingParty {
  name: string;
  id?: string;
}

interface ResponseCredential {
  response: { clientDataJSON: ArrayBuffer };
}

interface Step<TData, TState> {
  data?: TData;
  state: TState;
  type: StepType;
}

interface StepState {
  authId: string;
}

enum StepType {
  DeviceAuthentication = 'DeviceAuthentication',
  DeviceRegistration = 'DeviceRegistration',
  DeviceRegistrationChoice = 'DeviceRegistrationChoice',
  LoginFailure = 'LoginFailure',
  LoginSuccess = 'LoginSuccess',
  OneTimePassword = 'OneTimePassword',
  SecondFactorChoice = 'SecondFactorChoice',
  Username = 'Username',
  UsernamePassword = 'UsernamePassword',
  UserPassword = 'UserPassword',
}

interface WebAuthnRegistrationMetadata {
  attestationPreference: 'none' | 'indirect' | 'direct';
  authenticatorSelection: string;
  challenge: string;
  pubKeyCredParams: string;
  relyingPartyId: string;
  relyingPartyName: string;
  timeout: number;
  userId: string;
  userName: string;
}

interface WebAuthnAuthenticationMetadata {
  allowCredentials: string;
  challenge: string;
  relyingPartyId: string;
  timeout: number;
}

interface WebAuthnCallbacks {
  hiddenCallback?: HiddenValueCallback;
  metadataCallback?: MetadataCallback;
  textOutputCallback?: TextOutputCallback;
}

type WebAuthnTextOutputRegistration = string;

interface ParsedCredential {
  id: ArrayBuffer | SharedArrayBuffer;
  type: 'public-key';
}

export {
  AttestationType,
  DeviceStepState,
  ParsedCredential,
  RelyingParty,
  ResponseCredential,
  Step,
  StepType,
  UserVerificationType,
  WebAuthnCallbacks,
  WebAuthnAuthenticationMetadata,
  WebAuthnRegistrationMetadata,
  WebAuthnTextOutputRegistration,
};
