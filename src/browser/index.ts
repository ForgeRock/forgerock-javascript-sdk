import { CallbackType } from '../auth/enums';
import { parseRelyingPartyId, getClientDataJson } from '../util/webauthn';
import FRStep from 'fr-auth/fr-step';
import { WebAuthnAuthenticationMetadata, WebAuthnRegistrationMetadata } from 'browser/interfaces';

abstract class WebAuthn {
  public static async register(step: FRStep) {
    const { hiddenCallback, metadataCallback } = WebAuthn.getCallbacks(step);
    const publicKey = WebAuthn.createRegistrationPublicKey(metadataCallback.getOutputValue());
    const credentials = await WebAuthn.getRegistrationCredentials(publicKey);
    hiddenCallback.setInputValue(credentials);
    return step;
  }

  public static async authenticate(step: FRStep) {
    const { hiddenCallback, metadataCallback } = WebAuthn.getCallbacks(step);
    const publicKey = WebAuthn.createAuthenticationPublicKey(metadataCallback.getOutputValue());
    const credentials = await WebAuthn.getAuthenticationCredentials(publicKey);
    hiddenCallback.setInputValue(credentials);
    return step;
  }

  public static getCallbacks(step: FRStep) {
    const hiddenCallback = step.getCallbackOfType(CallbackType.HiddenValueCallback);
    const metadataCallback = step.getCallbackOfType(CallbackType.MetadataCallback);
    return { hiddenCallback, metadataCallback };
  }

  public static async getAuthenticationCredentials(publicKey: PublicKeyCredentialRequestOptions) {
    const credential = await navigator.credentials.get({ publicKey });
    if (credential === null) {
      throw new Error('No credentials exist');
    }

    const clientDataJSON = getClientDataJson(credential);
    const authenticatorData = new Int8Array(
      ((credential as PublicKeyCredential)
        .response as AuthenticatorAssertionResponse).authenticatorData,
    ).toString();
    const signature = new Int8Array(
      ((credential as PublicKeyCredential).response as AuthenticatorAssertionResponse).signature,
    ).toString();

    const outcome = `${clientDataJSON}::${authenticatorData}::${signature}::${credential.id}`;
    return outcome;
  }

  public static async getRegistrationCredentials(publicKey: PublicKeyCredentialCreationOptions) {
    const credential = await navigator.credentials.create({ publicKey });
    if (!credential) {
      throw new Error('Error creating credentials');
    }

    const clientDataJSON = getClientDataJson(credential);
    const attestationObject = new Int8Array(
      ((credential as PublicKeyCredential)
        .response as AuthenticatorAttestationResponse).attestationObject,
    ).toString();

    const outcome = `${clientDataJSON}::${attestationObject}::${credential.id}`;
    return outcome;
  }

  public static createAuthenticationPublicKey(
    outputValue: WebAuthnAuthenticationMetadata,
  ): PublicKeyCredentialRequestOptions {
    const { acceptableCredentials, challenge, relyingPartyId, timeout } = outputValue;

    const rpId = parseRelyingPartyId(relyingPartyId);
    return {
      allowCredentials: this.parseCredentials(acceptableCredentials),
      challenge: Uint8Array.from(atob(challenge), (c) => c.charCodeAt(0)).buffer,
      timeout,
      ...(rpId && { rpId }),
    };
  }

  public static createRegistrationPublicKey(
    outputValue: WebAuthnRegistrationMetadata,
  ): PublicKeyCredentialCreationOptions {
    const {
      attestationPreference,
      authenticatorSelection,
      challenge,
      pubKeyCredParams,
      relyingPartyId,
      relyingPartyName,
      timeout,
      userId,
      userName,
    } = outputValue;

    const rpId = parseRelyingPartyId(relyingPartyId);
    const rp: RelyingParty = {
      name: relyingPartyName,
      ...(rpId && { id: rpId }),
    };
    return {
      attestation: attestationPreference,
      authenticatorSelection: JSON.parse(authenticatorSelection),
      challenge: Uint8Array.from(atob(challenge), (c) => c.charCodeAt(0)).buffer,
      pubKeyCredParams: parseArray(pubKeyCredParams),
      rp,
      timeout,
      user: {
        displayName: userName,
        id: Int8Array.from(userId.split('').map((c: string) => c.charCodeAt(0))),
        name: userName,
      },
    };
  }

  public static parseCredentials(s: string) {
    try {
      const creds = s
        .split('}')
        .filter((x) => !!x)
        .map((x) => {
          const idArray: number[] = JSON.parse(/new Int8Array\((.+)\)/.exec(x)![1]);
          return {
            id: new Int8Array(idArray).buffer,
            type: 'public-key' as PublicKeyCredentialType,
          };
        });
      return creds;
    } catch (error) {
      throw new Error('Failed to parse credentials');
    }
  }
}

interface RelyingParty {
  name: string;
  id?: string;
}

function parseArray(s: string | any[]) {
  if (!s) {
    return undefined;
  }
  if (Array.isArray(s)) {
    return s;
  }
  if (typeof s !== 'string') {
    return undefined;
  }
  if (s.length > 0 && s[0] === '[') {
    return JSON.parse(s);
  }
  s = s.replace(/(\w+):/g, '"$1":');
  return JSON.parse(`[${s}]`);
}

export { parseArray };

export default WebAuthn;
