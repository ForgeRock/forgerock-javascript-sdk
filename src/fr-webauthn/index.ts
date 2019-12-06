import { CallbackType } from '../auth/enums';
import HiddenValueCallback from '../fr-auth/callbacks/hidden-value-callback';
import MetadataCallback from '../fr-auth/callbacks/metadata-callback';
import FRStep from '../fr-auth/fr-step';
import { getClientDataJson, parseRelyingPartyId } from '../util/webauthn';
import { Outcome, WebAuthnStepType } from './enums';
import { parsePubKeyArray } from './helpers';
import { WebAuthnAuthenticationMetadata, WebAuthnRegistrationMetadata } from './interfaces';

abstract class FRWebAuthn {
  public static getWebAuthStepType(step: FRStep): WebAuthnStepType {
    const outcomeCallback = step
      .getCallbacksOfType<HiddenValueCallback>(CallbackType.HiddenValueCallback)
      .find((x) => x.getOutputByName('id').value === 'webAuthnOutcome');
    if (!outcomeCallback) {
      return WebAuthnStepType.None;
    }

    const metadataCallback = step
      .getCallbacksOfType<MetadataCallback>(CallbackType.HiddenValueCallback)
      .find((x) => x.getOutputByName('data').value._type === 'WebAuthn');
    if (!metadataCallback) {
      return WebAuthnStepType.None;
    }

    const metadata = metadataCallback.getOutputByName('data').value;
    const authenticationData = metadata as WebAuthnAuthenticationMetadata;
    if (authenticationData.acceptableCredentials) {
      return WebAuthnStepType.Authentication;
    }

    return WebAuthnStepType.Registration;
  }

  public static async authenticate(step: FRStep): Promise<FRStep> {
    const { hiddenCallback, metadataCallback } = this.getCallbacks(step);
    let outcome: string;
    try {
      const publicKey = this.createAuthenticationPublicKey(metadataCallback.getOutputValue());
      const credential = await this.getAuthenticationCredential(publicKey);
      outcome = this.getAuthenticationOutcome(credential);
    } catch (error) {
      outcome = this.getErrorOutcome(error);
    }
    hiddenCallback.setInputValue(outcome);
    return step;
  }

  public static async register(step: FRStep): Promise<FRStep> {
    const { hiddenCallback, metadataCallback } = this.getCallbacks(step);
    let outcome: string;
    try {
      const publicKey = this.createRegistrationPublicKey(metadataCallback.getOutputValue());
      const credential = await this.getRegistrationCredential(publicKey);
      outcome = this.getRegistrationOutcome(credential);
    } catch (error) {
      outcome = this.getErrorOutcome(error);
    }
    hiddenCallback.setInputValue(outcome);
    return step;
  }

  public static getCallbacks(step: FRStep) {
    const hiddenCallback = step.getCallbackOfType(CallbackType.HiddenValueCallback);
    const metadataCallback = step.getCallbackOfType(CallbackType.MetadataCallback);
    return { hiddenCallback, metadataCallback };
  }

  public static async getAuthenticationCredential(
    publicKey: PublicKeyCredentialRequestOptions,
  ): Promise<PublicKeyCredential | null> {
    const credential = await navigator.credentials.get({ publicKey });
    return credential as PublicKeyCredential;
  }

  public static getAuthenticationOutcome(credential: PublicKeyCredential | null): string {
    if (!window.PublicKeyCredential) {
      return Outcome.Unsupported;
    }

    try {
      if (credential === null) {
        throw new Error('No credential provided');
      }

      const clientDataJSON = getClientDataJson(credential);
      const assertionResponse = credential.response as AuthenticatorAssertionResponse;
      const authenticatorData = new Int8Array(assertionResponse.authenticatorData).toString();
      const signature = new Int8Array(assertionResponse.signature).toString();

      return `${clientDataJSON}::${authenticatorData}::${signature}::${credential.id}`;
    } catch (error) {
      return this.getErrorOutcome(error);
    }
  }

  public static async getRegistrationCredential(
    publicKey: PublicKeyCredentialCreationOptions,
  ): Promise<PublicKeyCredential | null> {
    const credential = await navigator.credentials.create({ publicKey });
    return credential as PublicKeyCredential;
  }

  public static getRegistrationOutcome(credential: PublicKeyCredential | null): string {
    if (!window.PublicKeyCredential) {
      return Outcome.Unsupported;
    }

    try {
      if (credential === null) {
        throw new Error('No credential provided');
      }

      const clientDataJSON = getClientDataJson(credential);
      const attestationResponse = credential.response as AuthenticatorAttestationResponse;
      const attestationObject = new Int8Array(attestationResponse.attestationObject).toString();
      return `${clientDataJSON}::${attestationObject}::${credential.id}`;
    } catch (error) {
      return this.getErrorOutcome(error);
    }
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
    const { pubKeyCredParams: pubKeyCredParamsString } = outputValue;
    const pubKeyCredParams = parsePubKeyArray(pubKeyCredParamsString);
    if (!pubKeyCredParams) {
      throw new Error('No public key credentials were found');
    }

    const {
      attestationPreference,
      authenticatorSelection,
      challenge,

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
      pubKeyCredParams,
      rp,
      timeout,
      user: {
        displayName: userName,
        id: Int8Array.from(userId.split('').map((c: string) => c.charCodeAt(0))),
        name: userName,
      },
    };
  }

  // TODO: Remove this once AM is providing fully-serialized JSON
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

  private static getErrorOutcome(error: Error) {
    const name = error.name ? `${error.name}:` : '';
    return `${Outcome.Error}::${name}${error.message}`;
  }
}

interface RelyingParty {
  name: string;
  id?: string;
}

export default FRWebAuthn;
export { Outcome, WebAuthnStepType };
