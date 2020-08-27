/*
 * @forgerock/javascript-sdk
 *
 * pkce.test.ts
 *
 * Copyright (c) 2020 ForgeRock. All rights reserved.
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file for details.
 */

/**
 * @jest-environment jsdom
 */

import crypto from 'crypto';
import { TextEncoder } from 'util';
import PKCE from './pkce';

declare let window: unknown;

Object.defineProperty(window, 'crypto', {
  value: {
    getRandomValues: (array: Buffer): Buffer => crypto.randomFillSync(array),
    subtle: {
      digest: (alg: string, array: Uint8Array): Buffer => {
        if (alg === 'SHA-256') {
          return crypto.createHash('sha256').update(array).digest();
        }
        throw new Error(`Unsupported algorithm "${alg}"`);
      },
    },
  },
});

Object.defineProperty(global, 'TextEncoder', {
  value: TextEncoder,
});

describe('The PKCE module', () => {
  it('creates verifiers and challenges in the correct format', async () => {
    const validChars = /[a-z0-9-_]/i;
    for (let i = 0; i < 100; i++) {
      const verifier = PKCE.createVerifier();
      expect(verifier).toMatch(validChars);
      expect(verifier.length).toBeGreaterThan(90);

      const challenge = await PKCE.createChallenge(verifier);
      expect(challenge).toMatch(validChars);
    }
  });
});
