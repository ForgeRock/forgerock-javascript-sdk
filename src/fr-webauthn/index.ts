import { CallbackType } from '../auth/enums';
import HiddenValueCallback from '../fr-auth/callbacks/hidden-value-callback';
import MetadataCallback from '../fr-auth/callbacks/metadata-callback';
import FRStep from '../fr-auth/fr-step';
import { WebAuthnOutcome, WebAuthnStepType } from './enums';
import {
  getClientDataJson,
  parseCredentials,
  parsePubKeyArray,
  parseRelyingPartyId,
} from './helpers';
import {
  RelyingParty,
  WebAuthnAuthenticationMetadata,
  WebAuthnCallbacks,
  WebAuthnRegistrationMetadata,
  WebAuthnTextOutputRegistration,
} from './interfaces';
import TextOutputCallback from 'fr-auth/callbacks/text-output-callback';
import { parseWebAuthnAuthenticateText, parseWebAuthnRegisterText } from './script-parser';

// JSON-based WebAuthn
type WebAuthnMetadata = WebAuthnAuthenticationMetadata | WebAuthnRegistrationMetadata;
// Script-based WebAuthn
type WebAuthnTextOutput = WebAuthnTextOutputRegistration;
/**
 * Utility for integrating a web browser's WebAuthn API.
 *
 * Example:
 *
 * ```js
 * // Determine if a step is a WebAuthn step
 * const stepType = FRWebAuthn.getWebAuthnStepType(step);
 * if (stepType === WebAuthnStepType.Registration) {
 *   // Register a new device
 *   await FRWebAuthn.register(step);
 * } else if (stepType === WebAuthnStepType.Authentication) {
 *   // Authenticate with a registered device
 *   await FRWebAuthn.authenticate(step);
 * }
 */
abstract class FRWebAuthn {
  /**
   * Determines if the given step is a WebAuthn step.
   *
   * @param step The step to evaluate
   * @return A WebAuthnStepType value
   */
  public static getWebAuthnStepType(step: FRStep): WebAuthnStepType {
    const outcomeCallback = this.getOutcomeCallback(step);
    const metadataCallback = this.getMetadataCallback(step);
    const textOutputCallback = this.getTextOutputCallback(step);

    if (outcomeCallback && metadataCallback) {
      const metadata = metadataCallback.getOutputValue('data') as WebAuthnAuthenticationMetadata;
      if (metadata.allowCredentials) {
        return WebAuthnStepType.Authentication;
      }

      return WebAuthnStepType.Registration;
    } else if (outcomeCallback && textOutputCallback) {
      const message = textOutputCallback.getMessage();
      if (message.includes('allowCredentials')) {
        return WebAuthnStepType.Authentication;
      }

      return WebAuthnStepType.Registration;
    } else {
      return WebAuthnStepType.None;
    }
  }

  /**
   * Populates the step with the necessary authentication outcome.
   *
   * @param step The step that contains WebAuthn authentication data
   * @return The populated step
   */
  public static async authenticate(step: FRStep): Promise<FRStep> {
    const { hiddenCallback, metadataCallback, textOutputCallback } = this.getCallbacks(step);
    if (hiddenCallback && (metadataCallback || textOutputCallback)) {
      let outcome: string;

      try {
        let publicKey: PublicKeyCredentialRequestOptions;
        if (metadataCallback) {
          const meta = metadataCallback.getOutputValue('data') as WebAuthnAuthenticationMetadata;
          publicKey = this.createAuthenticationPublicKey(meta);
        } else if (textOutputCallback) {
          publicKey = parseWebAuthnAuthenticateText(textOutputCallback.getMessage());
        }
        // TypeScript doesn't like `publicKey` being assigned in conditionals above
        // eslint-disable-next-line
        // @ts-ignore
        const credential = await this.getAuthenticationCredential(publicKey);
        outcome = this.getAuthenticationOutcome(credential);
      } catch (error) {
        outcome = this.getErrorOutcome(error);
      }

      hiddenCallback.setInputValue(outcome);
      return step;
    } else {
      throw new Error('Invalid webauthn payload');
    }
  }

  /**
   * Populates the step with the necessary registration outcome.
   *
   * @param step The step that contains WebAuthn registration data
   * @return The populated step
   */
  public static async register(step: FRStep): Promise<FRStep> {
    const { hiddenCallback, metadataCallback, textOutputCallback } = this.getCallbacks(step);
    if (hiddenCallback && (metadataCallback || textOutputCallback)) {
      let outcome: string;

      try {
        let publicKey: PublicKeyCredentialRequestOptions;
        if (metadataCallback) {
          const meta = metadataCallback.getOutputValue('data') as WebAuthnRegistrationMetadata;
          publicKey = this.createRegistrationPublicKey(meta);
        } else if (textOutputCallback) {
          publicKey = parseWebAuthnRegisterText(textOutputCallback.getMessage());
        }
        // TypeScript doesn't like `publicKey` being assigned in conditionals above
        // eslint-disable-next-line
        // @ts-ignore
        const credential = await this.getRegistrationCredential(publicKey);
        outcome = this.getRegistrationOutcome(credential);
      } catch (error) {
        outcome = this.getErrorOutcome(error);
      }

      hiddenCallback.setInputValue(outcome);
      return step;
    } else {
      throw new Error('Invalid webauthn payload');
    }
  }

  /**
   * Returns an object containing the two WebAuthn callbacks.
   *
   * @param step The step that contains WebAuthn callbacks
   * @return The WebAuthn callbacks
   */
  public static getCallbacks(step: FRStep): WebAuthnCallbacks {
    const hiddenCallback = this.getOutcomeCallback(step);
    const metadataCallback = this.getMetadataCallback(step);
    const textOutputCallback = this.getTextOutputCallback(step);

    const returnObj: WebAuthnCallbacks = {
      hiddenCallback,
    };
    if (metadataCallback) {
      returnObj.metadataCallback = metadataCallback;
    } else if (textOutputCallback) {
      returnObj.textOutputCallback = textOutputCallback;
    }
    return returnObj;
  }

  /**
   * Returns the WebAuthn metadata callback containing data to pass to the browser
   * Web Authentication API.
   *
   * @param step The step that contains WebAuthn callbacks
   * @return The metadata callback
   */
  public static getMetadataCallback(step: FRStep): MetadataCallback | undefined {
    return step.getCallbacksOfType<MetadataCallback>(CallbackType.MetadataCallback).find((x) => {
      const cb = x.getOutputByName<WebAuthnMetadata | undefined>('data', undefined);
      return cb && cb.hasOwnProperty('relyingPartyId');
    });
  }

  /**
   * Returns the WebAuthn hidden value callback where the outcome should be populated.
   *
   * @param step The step that contains WebAuthn callbacks
   * @return The hidden value callback
   */
  public static getOutcomeCallback(step: FRStep): HiddenValueCallback | undefined {
    return step
      .getCallbacksOfType<HiddenValueCallback>(CallbackType.HiddenValueCallback)
      .find((x) => x.getOutputByName<string>('id', '') === 'webAuthnOutcome');
  }

  /**
   * Returns the WebAuthn metadata callback containing data to pass to the browser
   * Web Authentication API.
   *
   * @param step The step that contains WebAuthn callbacks
   * @return The metadata callback
   */
  public static getTextOutputCallback(step: FRStep): TextOutputCallback | undefined {
    return step
      .getCallbacksOfType<TextOutputCallback>(CallbackType.TextOutputCallback)
      .find((x) => {
        const cb = x.getOutputByName<WebAuthnTextOutput | undefined>('message', undefined);
        return cb && cb.includes('webAuthnOutcome');
      });
  }

  /**
   * Retrieves the credential from the browser Web Authentication API.
   *
   * @param options The public key options associated with the request
   * @return The credential
   */
  public static async getAuthenticationCredential(
    options: PublicKeyCredentialRequestOptions,
  ): Promise<PublicKeyCredential | null> {
    const credential = await navigator.credentials.get({ publicKey: options });
    return credential as PublicKeyCredential;
  }

  /**
   * Converts an authentication credential into the outcome expected by OpenAM.
   *
   * @param credential The credential to convert
   * @return The outcome string
   */
  public static getAuthenticationOutcome(credential: PublicKeyCredential | null): string {
    if (!window.PublicKeyCredential) {
      return WebAuthnOutcome.Unsupported;
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

  /**
   * Retrieves the credential from the browser Web Authentication API.
   *
   * @param options The public key options associated with the request
   * @return The credential
   */
  public static async getRegistrationCredential(
    options: PublicKeyCredentialCreationOptions,
  ): Promise<PublicKeyCredential | null> {
    const credential = await navigator.credentials.create({ publicKey: options });
    return credential as PublicKeyCredential;
  }

  /**
   * Converts a registration credential into the outcome expected by OpenAM.
   *
   * @param credential The credential to convert
   * @return The outcome string
   */
  public static getRegistrationOutcome(credential: PublicKeyCredential | null): string {
    if (!window.PublicKeyCredential) {
      return WebAuthnOutcome.Unsupported;
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

  /**
   * Converts authentication tree metadata into options required by the browser
   * Web Authentication API.
   *
   * @param metadata The metadata provided in the authentication tree MetadataCallback
   * @return The Web Authentication API request options
   */
  public static createAuthenticationPublicKey(
    metadata: WebAuthnAuthenticationMetadata,
  ): PublicKeyCredentialRequestOptions {
    const { allowCredentials, challenge, relyingPartyId, timeout } = metadata;
    const rpId = parseRelyingPartyId(relyingPartyId);

    return {
      allowCredentials: parseCredentials(allowCredentials),
      challenge: Uint8Array.from(atob(challenge), (c) => c.charCodeAt(0)).buffer,
      timeout,
      ...(rpId && { rpId }),
    };
  }

  /**
   * Converts authentication tree metadata into options required by the browser
   * Web Authentication API.
   *
   * @param metadata The metadata provided in the authentication tree MetadataCallback
   * @return The Web Authentication API request options
   */
  public static createRegistrationPublicKey(
    metadata: WebAuthnRegistrationMetadata,
  ): PublicKeyCredentialCreationOptions {
    const { pubKeyCredParams: pubKeyCredParamsString } = metadata;
    const pubKeyCredParams = parsePubKeyArray(pubKeyCredParamsString);
    if (!pubKeyCredParams) {
      throw new Error('Missing pubKeyCredParams');
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
    } = metadata;
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

  private static getErrorOutcome(error: Error): string {
    const name = error.name ? `${error.name}:` : '';
    return `${WebAuthnOutcome.Error}::${name}${error.message}`;
  }
}

export default FRWebAuthn;
export {
  RelyingParty,
  WebAuthnAuthenticationMetadata,
  WebAuthnCallbacks,
  WebAuthnOutcome,
  WebAuthnRegistrationMetadata,
  WebAuthnStepType,
};
