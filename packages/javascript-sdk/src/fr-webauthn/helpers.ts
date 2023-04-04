/*
 * @forgerock/javascript-sdk
 *
 * helpers.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @module
 * @ignore
 * These are private utility functions for HttpClient
 */
import { WebAuthnOutcomeType } from './enums';
import { ParsedCredential } from './interfaces';

function ensureArray(arr: RegExpMatchArray | null): string[] {
  return arr || [];
}

function arrayBufferToString(arrayBuffer: ArrayBuffer): string {
  // https://goo.gl/yabPex - To future-proof, we'll pass along whatever the browser
  // gives us and let AM disregard randomly-injected properties
  const uint8Array = new Uint8Array(arrayBuffer);
  const txtDecoder = new TextDecoder();

  const json = txtDecoder.decode(uint8Array);
  return json;
}

function getIndexOne(arr: RegExpMatchArray | null): string {
  return arr ? arr[1] : '';
}

// TODO: Remove this once AM is providing fully-serialized JSON
function parseCredentials(value: string): ParsedCredential[] {
  try {
    const creds = value
      .split('}')
      .filter((x) => !!x && x !== ']')
      .map((x) => {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        const idArray = parseNumberArray(x);
        return {
          id: new Int8Array(idArray).buffer,
          type: 'public-key' as PublicKeyCredentialType,
        };
      });
    return creds;
  } catch (error) {
    const e = new Error('Transforming credential object to string failed');
    e.name = WebAuthnOutcomeType.EncodingError;
    throw e;
  }
}

function parseNumberArray(value: string): number[] {
  const matches = /new Int8Array\((.+)\)/.exec(value);
  if (matches === null || matches.length < 2) {
    return [];
  }
  return JSON.parse(matches[1]);
}

function parsePubKeyArray(value: string | unknown[]): PublicKeyCredentialParameters[] | undefined {
  if (Array.isArray(value)) {
    return value as PublicKeyCredentialParameters[];
  }
  if (typeof value !== 'string') {
    return undefined;
  }
  if (value && value[0] === '[') {
    return JSON.parse(value);
  }
  value = value.replace(/(\w+):/g, '"$1":');
  return JSON.parse(`[${value}]`);
}

function parseAllowCredentialsArray(
  value: string | unknown[],
): PublicKeyCredentialDescriptor[] | undefined {
  if (!value) {
    return undefined;
  }
  if (Array.isArray(value)) {
    return value as PublicKeyCredentialDescriptor[];
  }
  if (typeof value !== 'string') {
    return undefined;
  }
  if (value && value[0] === '[') {
    return JSON.parse(value);
  }
  value = value.replace(/(\w+):/g, '"$1":');
  return JSON.parse(`[${value}]`);
}

/**
 * AM is currently serializing RP as one of the following formats, depending on
 * whether RP ID has been configured:
 *   "relyingPartyId":""
 *   "relyingPartyId":"rpId: \"foo\","
 * This regex handles both formats, but should be removed once AM is fixed.
 */
function parseRelyingPartyId(relyingPartyId: string): string {
  if (relyingPartyId.includes('rpId')) {
    return relyingPartyId.replace(/rpId: "(.+)",/, '$1');
  } else {
    return relyingPartyId.replace(/id: "(.+)",/, '$1');
  }
}

export {
  ensureArray,
  arrayBufferToString,
  getIndexOne,
  parseCredentials,
  parseNumberArray,
  parseAllowCredentialsArray,
  parsePubKeyArray,
  parseRelyingPartyId,
};
