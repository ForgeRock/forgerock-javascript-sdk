import { ParsedCredential } from './interfaces';

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

export { parsePubKeyArray, parseCredentials, parseNumberArray };
