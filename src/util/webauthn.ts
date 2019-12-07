interface Credential {
  response: { clientDataJSON: ArrayBuffer };
}

// TODO: Test webauthn and find out what type def for Credential is correct
function getClientDataJson(credential: Credential): string {
  // https://goo.gl/yabPex - To future-proof, we'll pass along whatever the browser
  // gives us and let AM disregard randomly-injected properties
  const uint8Array = new Uint8Array(credential.response.clientDataJSON);
  const json = String.fromCharCode.apply(null, Array.from(uint8Array));
  return json;
}

// AM is currently serializing RP as one of the following formats, depending on
// whether RP ID has been configured:
//   "relyingPartyId":""
//   "relyingPartyId":"rpId: \"foo\","
// This regex handles both formats, but should be removed once AM is fixed.
function parseRelyingPartyId(relyingPartyId: string): string {
  return relyingPartyId.replace(/rpId: "(.+)",/, '$1');
}

export { getClientDataJson, parseRelyingPartyId };
