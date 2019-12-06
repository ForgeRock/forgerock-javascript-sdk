export interface WebAuthnRegistrationMetadata {
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

export interface WebAuthnAuthenticationMetadata {
  acceptableCredentials: string;
  challenge: string;
  relyingPartyId: string;
  timeout: number;
}
