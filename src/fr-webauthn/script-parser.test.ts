import { parseWebAuthnAuthenticateText, parseWebAuthnRegisterText } from './script-parser';
import { authenticateInput, registerInput, registerOutput } from './script-text.mock.data';

describe('Parsing of the WebAuthn script type text', () => {
  it('should parse the WebAuthn authenticate block of text', () => {
    const obj = parseWebAuthnAuthenticateText(authenticateInput);
    expect(obj.allowCredentials[0].type).toBe('public-key');
    expect(obj.allowCredentials[0].id.byteLength > 0).toBe(true);
    expect(obj.challenge.byteLength > 0).toBe(true);
    expect(obj.timeout).toBe(60000);
  });

  it('should parse the WebAuthn register block of text', () => {
    const obj = parseWebAuthnRegisterText(registerInput);
    expect(obj.attestation).toBe(registerOutput.attestation);
    expect(obj.authenticatorSelection).toStrictEqual(registerOutput.authenticatorSelection);
    expect(obj.challenge.byteLength > 0).toBe(true);
    expect(obj.pubKeyCredParams).toStrictEqual(registerOutput.pubKeyCredParams);
    expect(obj.rp).toStrictEqual(registerOutput.rp);
    expect(obj.timeout).toBe(registerOutput.timeout);
    expect(obj.user.displayName).toStrictEqual(registerOutput.user.displayName);
    expect(obj.user.name).toBe(registerOutput.user.name);
    expect(obj.user.id.byteLength > 0).toBe(true);
  });
});
