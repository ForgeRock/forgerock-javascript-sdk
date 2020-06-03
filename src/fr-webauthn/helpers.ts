import { ParsedCredential, ResponseCredential } from './interfaces';

function ensureArray(arr: RegExpMatchArray | null): string[] {
  return arr || [];
}

function getClientDataJson(credential: ResponseCredential): string {
  // https://goo.gl/yabPex - To future-proof, we'll pass along whatever the browser
  // gives us and let AM disregard randomly-injected properties
  const uint8Array = new Uint8Array(credential.response.clientDataJSON);
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
      .filter((x) => !!x)
      .map((x) => {
        const idArray = parseNumberArray(x);
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

function parseNumberArray(value: string): number[] {
  const matches = /new Int8Array\((.+)\)/.exec(value);
  if (matches === null || matches.length < 2) {
    return [];
  }
  return JSON.parse(matches[1]);
}

function parsePubKeyArray(value: string | unknown[]): PublicKeyCredentialParameters[] | undefined {
  if (!value) {
    return undefined;
  }
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
  getClientDataJson,
  getIndexOne,
  parseCredentials,
  parseNumberArray,
  parseAllowCredentialsArray,
  parsePubKeyArray,
  parseRelyingPartyId,
};
