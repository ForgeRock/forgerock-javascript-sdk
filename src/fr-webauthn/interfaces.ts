import HiddenValueCallback from '../fr-auth/callbacks/hidden-value-callback';
import MetadataCallback from '../fr-auth/callbacks/metadata-callback';

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
  acceptableCredentials: string;
  challenge: string;
  relyingPartyId: string;
  timeout: number;
}

interface WebAuthnCallbacks {
  hiddenCallback?: HiddenValueCallback;
  metadataCallback?: MetadataCallback;
}

interface ParsedCredential {
  id: ArrayBuffer | SharedArrayBuffer;
  type: 'public-key';
}

export {
  ParsedCredential,
  WebAuthnCallbacks,
  WebAuthnAuthenticationMetadata,
  WebAuthnRegistrationMetadata,
};
