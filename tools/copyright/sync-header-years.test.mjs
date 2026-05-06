import assert from 'node:assert/strict';
import test from 'node:test';

import {
  hasInvalidPingCopyrightHeader,
  hasPingCopyrightHeader,
  isExcluded,
  updateCopyrightYears,
} from './sync-header-years.mjs';

test('updates stale range end year and keeps start year', () => {
  const input = '/* Copyright 2020-2024 Ping Identity. All Rights Reserved */';
  const actual = updateCopyrightYears(input, 2026);
  assert.equal(actual, '/* Copyright 2020 - 2026 Ping Identity. All Rights Reserved */');
});

test('normalizes separator on an already-current range', () => {
  const input = '/* Copyright 2020-2026 Ping Identity. All Rights Reserved */';
  const actual = updateCopyrightYears(input, 2026);
  assert.equal(actual, '/* Copyright 2020 - 2026 Ping Identity. All Rights Reserved */');
});

test('expands stale single year to a range preserving start year', () => {
  const input = '/* Copyright 2020 Ping Identity. All Rights Reserved */';
  const actual = updateCopyrightYears(input, 2026);
  assert.equal(actual, '/* Copyright 2020 - 2026 Ping Identity. All Rights Reserved */');
});

test('does not change an already-current spaced range', () => {
  const input = '/* Copyright 2025 - 2026 Ping Identity. All Rights Reserved */';
  const actual = updateCopyrightYears(input, 2026);
  assert.equal(actual, input);
});

test('supports © and &copy; variants', () => {
  const input = [
    '/* © Copyright 2020-2024 Ping Identity. */',
    '<!-- &copy; Copyright 2020-2024 Ping Identity. -->',
  ].join('\n');
  const actual = updateCopyrightYears(input, 2026);
  assert.equal(
    actual,
    [
      '/* © Copyright 2020 - 2026 Ping Identity. */',
      '<!-- &copy; Copyright 2020 - 2026 Ping Identity. -->',
    ].join('\n'),
  );
});

test('does not update non-Ping headers', () => {
  const input = '/* Copyright 2020-2025 Example Corp. */';
  const actual = updateCopyrightYears(input, 2026);
  assert.equal(actual, input);
});

test('updates Ping Identity Corporation ranges with spaces and (c)', () => {
  const input = '/* Copyright (c) 2023 - 2024 Ping Identity Corporation. All right reserved. */';
  const actual = updateCopyrightYears(input, 2026);
  assert.equal(
    actual,
    '/* Copyright (c) 2023 - 2026 Ping Identity Corporation. All right reserved. */',
  );
});

test('expands stale single year with (c) to a range for Ping Identity Corporation', () => {
  const input = '/* Copyright (c) 2023 Ping Identity Corporation. All right reserved. */';
  const actual = updateCopyrightYears(input, 2026);
  assert.equal(
    actual,
    '/* Copyright (c) 2023 - 2026 Ping Identity Corporation. All right reserved. */',
  );
});

test('flags Ping headers without a valid year', () => {
  const input = '/* Copyright Ping Identity Corporation. All right reserved. */';
  assert.equal(hasInvalidPingCopyrightHeader(input), true);
});

test('flags Ping headers with a <current_year> placeholder', () => {
  const input =
    '/* Copyright (c) <current_year> Ping Identity Corporation. All rights reserved. */';
  assert.equal(hasInvalidPingCopyrightHeader(input), true);
});

test('does not flag valid Ping headers', () => {
  const input = '/* Copyright (c) 2020 - 2026 Ping Identity Corporation. */';
  assert.equal(hasInvalidPingCopyrightHeader(input), false);
});

test('does not flag non-header Ping copyright text', () => {
  const input = 'This document is Copyright Ping Identity Corporation.';
  assert.equal(hasInvalidPingCopyrightHeader(input), false);
});

test('excludes test files from processing', () => {
  assert.equal(isExcluded('src/foo.test.ts'), true);
  assert.equal(isExcluded('src/foo.test.mjs'), true);
  assert.equal(isExcluded('src/foo.spec.js'), true);
});

test('excludes dist and vendor paths from processing', () => {
  assert.equal(isExcluded('dist/foo.js'), true);
  assert.equal(isExcluded('vendor/lib.js'), true);
});

test('excludes vite.config and vitest.setup files from processing', () => {
  assert.equal(isExcluded('vite.config.ts'), true);
  assert.equal(isExcluded('packages/foo/vite.config.ts'), true);
  assert.equal(isExcluded('e2e/token-vault-app/vite.interceptor.config.ts'), true);
  assert.equal(isExcluded('vitest.setup.ts'), true);
  assert.equal(isExcluded('packages/foo/vitest.setup.ts'), true);
});

test('excludes playwright.config files from processing', () => {
  assert.equal(isExcluded('e2e/autoscript-suites/playwright.config.ts'), true);
  assert.equal(isExcluded('e2e/token-vault-suites/playwright.config.ts'), true);
});

test('excludes _polyfills/ directory from processing', () => {
  assert.equal(isExcluded('e2e/autoscript-apps/src/_polyfills/fast-text-encoder.js'), true);
});

test('excludes tools/ directory from processing', () => {
  assert.equal(isExcluded('tools/copyright/sync-header-years.mjs'), true);
  assert.equal(isExcluded('tools/release/local.mjs'), true);
});

test('does not exclude regular source files', () => {
  assert.equal(isExcluded('src/foo.ts'), false);
  assert.equal(isExcluded('packages/sdk/src/index.ts'), false);
});

test('hasPingCopyrightHeader detects valid block comment header', () => {
  const input = '/* Copyright (c) 2020 - 2026 Ping Identity Corporation. All rights reserved. */';
  assert.equal(hasPingCopyrightHeader(input), true);
});

test('hasPingCopyrightHeader detects header in multi-line block comment', () => {
  const input = `/*
 * @forgerock/javascript-sdk
 *
 * Copyright (c) 2020 - 2026 Ping Identity Corporation. All rights reserved.
 */`;
  assert.equal(hasPingCopyrightHeader(input), true);
});

test('hasPingCopyrightHeader returns false when no Ping copyright present', () => {
  const input = `/*
 * Some other library header
 */
export const x = 1;`;
  assert.equal(hasPingCopyrightHeader(input), false);
});

test('hasPingCopyrightHeader returns false for non-comment Ping copyright text', () => {
  const input = 'This document is Copyright Ping Identity Corporation.';
  assert.equal(hasPingCopyrightHeader(input), false);
});
