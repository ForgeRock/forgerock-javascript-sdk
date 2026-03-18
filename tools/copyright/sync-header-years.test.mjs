import assert from 'node:assert/strict';
import test from 'node:test';

import {
  hasInvalidPingCopyrightHeader,
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

test('does not exclude regular source files', () => {
  assert.equal(isExcluded('src/foo.ts'), false);
  assert.equal(isExcluded('packages/sdk/src/index.ts'), false);
});
