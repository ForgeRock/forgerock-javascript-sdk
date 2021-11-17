/*
 * @forgerock/javascript-sdk
 *
 * helpers.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

import { parseCredentials, parsePubKeyArray } from './helpers';
import {
  allowCredentials70,
  allowMultipleCredentials70,
  acceptableCredentials653,
  acceptableMultipleCredentials653,
  pubKeyCredParamsStr,
} from './helpers.mock.data';

describe('Test WebAuthn helper functions', () => {
  it('should parse the one credential in the MetadataCallback 7.0', () => {
    const credentials = parseCredentials(allowCredentials70);
    expect(credentials[0].id.toString()).toBe('[object ArrayBuffer]');
    expect(credentials[0].type).toBe('public-key');
  });

  it('should parse the two credentials in the MetadataCallback 7.0', () => {
    const credentials = parseCredentials(allowMultipleCredentials70);
    expect(credentials[0].id.toString()).toBe('[object ArrayBuffer]');
    expect(credentials[0].type).toBe('public-key');
    expect(credentials[1].id.toString()).toBe('[object ArrayBuffer]');
    expect(credentials[1].type).toBe('public-key');
  });

  it('should parse the one credential in the MetadataCallback 6.5', () => {
    const credentials = parseCredentials(acceptableCredentials653);
    expect(credentials[0].id.toString()).toBe('[object ArrayBuffer]');
    expect(credentials[0].type).toBe('public-key');
  });

  it('should parse the two credentials in the MetadataCallback 6.5', () => {
    const credentials = parseCredentials(acceptableMultipleCredentials653);
    expect(credentials[0].id.toString()).toBe('[object ArrayBuffer]');
    expect(credentials[0].type).toBe('public-key');
    expect(credentials[1].id.toString()).toBe('[object ArrayBuffer]');
    expect(credentials[1].type).toBe('public-key');
  });

  it('should parse the pubKeyCredParams in the MetadataCallback 7.0 & 6.5.3', () => {
    const pubKeyCredParams = parsePubKeyArray(pubKeyCredParamsStr);
    expect(pubKeyCredParams).toContainEqual({ type: 'public-key', alg: -7 });
    expect(pubKeyCredParams).toContainEqual({ type: 'public-key', alg: -257 });
  });
});
