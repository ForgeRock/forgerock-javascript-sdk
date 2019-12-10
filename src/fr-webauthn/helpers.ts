import { ParsedCredential, ResponseCredential } from './interfaces';

function parsePubKeyArray(s: string | unknown[]): PublicKeyCredentialParameters[] | undefined {
  if (!s) {
    return undefined;
  }
  if (Array.isArray(s)) {
    return s as PublicKeyCredentialParameters[];
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

function parseNumberArray(s: string): number[] {
  const matches = /new Int8Array\((.+)\)/.exec(s);
  if (matches === null || matches.length < 2) {
    return [];
  }
  return JSON.parse(matches[1]);
}

// TODO: Remove this once AM is providing fully-serialized JSON
function parseCredentials(s: string): ParsedCredential[] {
  try {
    const creds = s
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

function getClientDataJson(credential: ResponseCredential): string {
  // https://goo.gl/yabPex - To future-proof, we'll pass along whatever the browser
  // gives us and let AM disregard randomly-injected properties
  const uint8Array = new Uint8Array(credential.response.clientDataJSON);
  const json = String.fromCharCode.apply(null, Array.from(uint8Array));
  return json;
}

/**
 * AM is currently serializing RP as one of the following formats, depending on
 * whether RP ID has been configured:
 *   "relyingPartyId":""
 *   "relyingPartyId":"rpId: \"foo\","
 * This regex handles both formats, but should be removed once AM is fixed.
 */
function parseRelyingPartyId(relyingPartyId: string): string {
  return relyingPartyId.replace(/rpId: "(.+)",/, '$1');
}

export {
  getClientDataJson,
  parseCredentials,
  parseNumberArray,
  parsePubKeyArray,
  parseRelyingPartyId,
};
