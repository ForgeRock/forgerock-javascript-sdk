import { ensureArray, getIndexOne, parsePubKeyArray } from './helpers';
import { AttestationType, UserVerificationType } from './interfaces';

function parseWebAuthnRegisterText(text: string): PublicKeyCredentialCreationOptions {
  const txtEncoder = new TextEncoder();

  // e.g. `attestation: "none"`
  const attestation = getIndexOne(text.match(/attestation:\s{0,}"(\w+)"/)) as AttestationType;
  // e.g. `timeout: 60000`
  const timeout = Number(getIndexOne(text.match(/timeout:\s{0,}(\d+)/)));
  // e.g. `"userVerification":"preferred"`
  const userVerification = getIndexOne(
    text.match(/"userVerification":\s{0,}"(\w+)"/),
  ) as UserVerificationType;

  // e.g. `rp: {\n id: \"https://user.example.com:3002\",\n name: \"ForgeRock\"\n }`
  const rp = getIndexOne(text.match(/rp:\s{0,}{([^}]+)}/)).trim();
  // e.g. `id: \"https://user.example.com:3002\"
  const rpId = getIndexOne(rp.match(/id:\s{0,}"([^"]*)"/));
  // e.g. `name: \"ForgeRock\"`
  const rpName = getIndexOne(rp.match(/name:\s{0,}"([^"]*)"/));

  // e.g. `user: {\n id: Uint8Array.from(\"NTdhN...RiNjI5\",
  // function (c) { return c.charCodeAt(0) }),\n
  // name: \"57a5b4e4-...-a4f2e5d4b629\",\n
  // displayName: \"57a5b4e4-...-a4f2e5d4b629\"\n }`
  const user = getIndexOne(text.match(/user:\s{0,}{([^]{0,})},/)).trim();
  // e.g `id: Uint8Array.from(\"NTdhN...RiNjI5\",`
  const userId = getIndexOne(user.match(/id:\s{0,}Uint8Array.from\("([^"]+)"/));
  // e.g. `name: \"57a5b4e4-...-a4f2e5d4b629\",`
  const userName = getIndexOne(user.match(/name:\s{0,}"(\w+)"/));
  // e.g. `displayName: \"57a5b4e4-...-a4f2e5d4b629\"`
  const userDisplayName = getIndexOne(user.match(/displayName:\s{0,}"(\w+)"/));

  // e.g. `pubKeyCredParams: [
  // { \"type\": \"public-key\", \"alg\": -257 }, { \"type\": \"public-key\", \"alg\": -7 }
  // ]`
  const pubKeyCredParamsString = getIndexOne(
    text.match(/pubKeyCredParams:\s{0,}\[([^]+) ]/),
  ).trim();
  // e.g. `{ \"type\": \"public-key\", \"alg\": -257 }, { \"type\": \"public-key\", \"alg\": -7 }`
  const pubKeyCredParams = parsePubKeyArray(pubKeyCredParamsString);
  if (!pubKeyCredParams) {
    throw new Error('Missing pubKeyCredParams');
  }

  // e.g. `challenge: new Int8Array([87, -95, 18, ... -3,  49, 12, 81]).buffer,`
  const challengeArr: string[] = ensureArray(
    text.match(/challenge:\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/),
  );
  // e.g. `[87, -95, 18, ... -3,  49, 12, 81]`
  const challengeJSON = JSON.parse(challengeArr[2]);
  // e.g. [87, -95, 18, ... -3,  49, 12, 81]
  const challenge = new Int8Array(challengeJSON).buffer;

  return {
    attestation,
    authenticatorSelection: {
      userVerification,
    },
    challenge,
    excludeCredentials: [],
    pubKeyCredParams,
    rp: {
      id: rpId,
      name: rpName,
    },
    timeout,
    user: {
      displayName: userDisplayName,
      id: txtEncoder.encode(userId),
      name: userName,
    },
  };
}

function parseWebAuthnAuthenticateText(text: string): PublicKeyCredentialRequestOptions {
  // e.g. `allowCredentials: [
  // { \"type\": \"public-key\",
  // \"id\": new Int8Array([-107, 93, 68, -67, ... -19, 7, 4]).buffer }
  // ]`
  const allowCredentialsText = getIndexOne(
    text.match(/allowCredentials:\s{0,}\[([^]+)\s{0,}]/),
  ).trim();
  // Splitting objects in array in case the user has multiple keys
  const allowCredentialArr = allowCredentialsText.split('},') || [allowCredentialsText];
  // Iterating over array of substrings
  const allowCredentials = allowCredentialArr.map((str) => {
    // e.g. `{ \"type\": \"public-key\",
    const type = getIndexOne(str.match(/"type":\s{0,}"([\w-]+)"/)) as 'public-key';
    // e.g. \"id\": new Int8Array([-107, 93, 68, -67, ... -19, 7, 4]).buffer
    const idArr = ensureArray(text.match(/"id":\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/));
    // e.g. `[-107, 93, 68, -67, ... -19, 7, 4]`
    const idJSON = JSON.parse(idArr[2]);
    // e.g. [-107, 93, 68, -67, ... -19, 7, 4]
    const id = new Int8Array(idJSON).buffer;

    return {
      type,
      id,
    };
  });

  // e.g. `timeout: 60000`
  const timeout = Number(getIndexOne(text.match(/timeout:\s{0,}(\d+)/)));

  // e.g. `challenge: new Int8Array([87, -95, 18, ... -3,  49, 12, 81]).buffer,`
  const challengeArr: string[] = ensureArray(
    text.match(/challenge:\s{0,}new\s{0,}(Uint|Int)8Array\(([^\)]+)/),
  );
  // e.g. `[87, -95, 18, ... -3,  49, 12, 81]`
  const challengeJSON = JSON.parse(challengeArr[2]);
  // e.g. [87, -95, 18, ... -3,  49, 12, 81]
  const challenge = new Int8Array(challengeJSON).buffer;
  // e.g. `rpId: "user.example.com",`
  const rpId = getIndexOne(text.match(/rpId:\s{0,}\[([^]+)\s{0,}]/));

  return {
    allowCredentials,
    challenge,
    timeout,
    ...(rpId && { id: rpId }),
  };
}

export { parseWebAuthnAuthenticateText, parseWebAuthnRegisterText };
