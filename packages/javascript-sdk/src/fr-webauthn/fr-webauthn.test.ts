/*
 * @forgerock/javascript-sdk
 *
 * fr-webauthn.test.ts
 *
 * Copyright (c) 2020 - 2025 Ping Identity Corporation. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { WebAuthnStepType } from './enums';
import FRWebAuthn from './index';
import {
  webAuthnRegJSCallback653,
  webAuthnAuthJSCallback653,
  webAuthnRegJSCallback70,
  webAuthnAuthJSCallback70,
  webAuthnRegMetaCallback70,
  webAuthnAuthMetaCallback70,
  webAuthnRegJSCallback70StoredUsername,
  webAuthnAuthJSCallback70StoredUsername,
  webAuthnRegMetaCallback70StoredUsername,
  webAuthnAuthMetaCallback70StoredUsername,
  webAuthnAuthConditionalMetaCallback,
} from './fr-webauthn.mock.data';
import FRStep from '../fr-auth/fr-step';

describe('Test FRWebAuthn class with 6.5.3 "Passwordless"', () => {
  it('should return Registration type with register text-output callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnRegJSCallback653 as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Registration);
  });
  it('should return Authentication type with authenticate text-output callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnAuthJSCallback653 as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Authentication);
  });
  // it('should return Registration type with register metadata callbacks', () => {
  //   // eslint-disable-next-line
  //   const step = new FRStep(webAuthnRegMetaCallback653 as any);
  //   const stepType = FRWebAuthn.getWebAuthnStepType(step);
  //   expect(stepType).toBe(WebAuthnStepType.Registration);
  // });
  // it('should return Authentication type with authenticate metadata callbacks', () => {
  //   // eslint-disable-next-line
  //   const step = new FRStep(webAuthnAuthMetaCallback653 as any);
  //   const stepType = FRWebAuthn.getWebAuthnStepType(step);
  //   expect(stepType).toBe(WebAuthnStepType.Authentication);
  // });
});

describe('Test FRWebAuthn class with 7.0 "Passwordless"', () => {
  it('should return Registration type with register text-output callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnRegJSCallback70 as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Registration);
  });
  it('should return Authentication type with authenticate text-output callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnAuthJSCallback70 as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Authentication);
  });
  it('should return Registration type with register metadata callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnRegMetaCallback70 as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Registration);
  });
  it('should return Authentication type with authenticate metadata callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnAuthMetaCallback70 as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Authentication);
  });
});

describe('Test FRWebAuthn class with 7.0 "Usernameless"', () => {
  it('should return Registration type with register text-output callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnRegJSCallback70StoredUsername as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Registration);
  });
  it('should return Authentication type with authenticate text-output callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnAuthJSCallback70StoredUsername as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Authentication);
  });
  it('should return Registration type with register metadata callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnRegMetaCallback70StoredUsername as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Registration);
  });
  it('should return Authentication type with authenticate metadata callbacks', () => {
    // eslint-disable-next-line
    const step = new FRStep(webAuthnAuthMetaCallback70StoredUsername as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Authentication);
  });
});

describe('Test FRWebAuthn class with Conditional UI', () => {
  beforeEach(() => {
    // Mock navigator.credentials and window.PublicKeyCredential
    Object.defineProperty(global.navigator, 'credentials', {
      value: {
        get: vi.fn().mockResolvedValue(null),
        create: vi.fn(),
      },
      writable: true,
    });
    Object.defineProperty(window, 'PublicKeyCredential', {
      value: {
        isConditionalMediationAvailable: vi.fn(),
      },
      writable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should detect if conditional UI is supported', async () => {
    vi.spyOn(window.PublicKeyCredential, 'isConditionalMediationAvailable').mockResolvedValue(true);
    const isSupported = await FRWebAuthn.isConditionalUISupported();
    expect(isSupported).toBe(true);
  });

  it('should return Authentication type with conditional UI metadata callback', () => {
    const step = new FRStep(webAuthnAuthConditionalMetaCallback as any);
    const stepType = FRWebAuthn.getWebAuthnStepType(step);
    expect(stepType).toBe(WebAuthnStepType.Authentication);
  });

  it('should create authentication public key with empty allowCredentials for conditional UI', () => {
    const metadata: any = {
      _action: 'webauthn_authentication',
      challenge: 'JEisuqkVMhI490jM0/iEgrRz+j94OoGc7gdY4gYicSk=',
      allowCredentials: '',
      _allowCredentials: [],
      timeout: 60000,
      userVerification: 'preferred',
      conditionalWebAuthn: true,
      relyingPartyId: '',
      _relyingPartyId: 'example.com',
      extensions: {},
      supportsJsonResponse: true,
    };

    const publicKey = FRWebAuthn.createAuthenticationPublicKey(metadata);

    expect(publicKey.challenge).toBeDefined();
    expect(publicKey.timeout).toBe(60000);
    expect(publicKey.userVerification).toBe('preferred');
    expect(publicKey.rpId).toBe('example.com');
    // allowCredentials should not be present for conditional UI with empty credentials
    expect(publicKey.allowCredentials).toBeUndefined();
  });

  it('should warn and fallback if conditional UI is requested but not supported', async () => {
    // Mock browser support for conditional UI to be false
    vi.spyOn(window.PublicKeyCredential, 'isConditionalMediationAvailable').mockResolvedValue(
      false,
    );
    // FIX APPLIED HERE: Added block comment to empty function
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {
      /* empty */
    });
    const getSpy = vi.spyOn(navigator.credentials, 'get');

    // Attempt to authenticate with conditional UI requested
    await FRWebAuthn.getAuthenticationCredential({}, true);

    // Expect a warning to be logged
    expect(consoleSpy).toHaveBeenCalledWith(
      'Conditional UI was requested, but is not supported by this browser.',
    );

    // Expect the call to navigator.credentials.get to NOT have the mediation property
    expect(getSpy).toHaveBeenCalledWith(
      expect.not.objectContaining({
        mediation: 'conditional',
      }),
    );
  });

  it('should set mediation to conditional if supported', async () => {
    // Mock browser support for conditional UI to be true
    vi.spyOn(window.PublicKeyCredential, 'isConditionalMediationAvailable').mockResolvedValue(true);
    const getSpy = vi.spyOn(navigator.credentials, 'get');

    // Attempt to authenticate with conditional UI requested
    await FRWebAuthn.getAuthenticationCredential({}, true);

    // Expect the call to navigator.credentials.get to have the mediation property
    expect(getSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        mediation: 'conditional',
      }),
    );
  });
});
