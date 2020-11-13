/*
 * @forgerock/javascript-sdk
 *
 * fr-webauthn.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
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
