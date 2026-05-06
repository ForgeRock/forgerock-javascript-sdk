#!/usr/bin/env node

import { execFileSync } from 'node:child_process';
import { readFileSync, statSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

function isCliExecution() {
  return process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
}

function run() {
  const args = new Set(process.argv.slice(2));
  const checkOnly = args.has('--check');
  const currentYear = new Date().getFullYear();

  const stagedFiles = getStagedFiles();
  const stagedFileData = [];
  const invalidFiles = [];
  const changedFiles = [];

  for (const file of stagedFiles) {
    if (!isFile(file) || isExcluded(file)) {
      continue;
    }
    const absolutePath = resolve(process.cwd(), file);
    const original = safeReadUtf8(absolutePath);
    if (original === null) {
      continue;
    }
    stagedFileData.push({ file, absolutePath, original });
    if (hasInvalidPingCopyrightHeader(original)) {
      invalidFiles.push(file);
    }
  }

  if (invalidFiles.length > 0) {
    console.error('Invalid Ping copyright header year format in staged files:');
    for (const file of invalidFiles) {
      console.error(`- ${file}`);
    }
    process.exit(1);
  }

  const missingHeaderFiles = [];
  for (const { file, original } of stagedFileData) {
    if (SOURCE_FILE_PATTERN.test(file) && !hasPingCopyrightHeader(original)) {
      missingHeaderFiles.push(file);
    }
  }

  if (missingHeaderFiles.length > 0) {
    console.error('Missing Ping copyright header in staged files:');
    for (const file of missingHeaderFiles) {
      console.error(`- ${file}`);
    }
    process.exit(1);
  }

  for (const { file, absolutePath, original } of stagedFileData) {
    const updated = updateCopyrightYears(original, currentYear);
    if (updated === original) {
      continue;
    }
    changedFiles.push(file);
    if (!checkOnly) {
      writeFileSync(absolutePath, updated, 'utf8');
    }
  }

  if (!checkOnly && changedFiles.length > 0) {
    execFileSync('git', ['add', '--', ...changedFiles], { stdio: 'inherit' });
  }

  if (checkOnly && changedFiles.length > 0) {
    console.error('Stale Ping copyright years found in staged files:');
    for (const file of changedFiles) {
      console.error(`- ${file}`);
    }
    process.exit(1);
  }
}

function getStagedFiles() {
  const output = execFileSync('git', ['diff', '--cached', '--name-only', '--diff-filter=ACMR'], {
    encoding: 'utf8',
  }).trim();

  if (!output) {
    return [];
  }
  return output.split('\n').filter(Boolean);
}

export function isExcluded(filePath) {
  return EXCLUDE_PATTERNS.some((pattern) => pattern.test(filePath));
}

const EXCLUDE_PATTERNS = [
  /\.test\.[cm]?[jt]sx?$/i,
  /\.spec\.[cm]?[jt]sx?$/i,
  /(^|[/\\])dist[/\\]/,
  /(^|[/\\])vendor[/\\]/,
  /(^|[/\\])node_modules[/\\]/,
  /(^|[/\\])tools[/\\]/,
  /(^|[/\\])_polyfills[/\\]/,
  /(^|[/\\])vite[^/\\]*\.config\.[cm]?[jt]sx?$/i,
  /(^|[/\\])vitest\.setup\.[cm]?[jt]sx?$/i,
  /(^|[/\\])playwright\.config\.[cm]?[jt]sx?$/i,
];

function isFile(filePath) {
  try {
    return statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function safeReadUtf8(filePath) {
  try {
    return readFileSync(filePath, 'utf8');
  } catch {
    return null;
  }
}

export function updateCopyrightYears(content, year) {
  const regex =
    /(^.*(?:©\s*|&copy;\s*)?Copyright(?:\s*\(c\))?\s+)(\d{4})(?:([ \t]*-[ \t]*)(\d{4}))?(\s+Ping Identity(?: Corporation)?\b.*$)/gim;

  return content.replace(regex, (_, prefix, startYear, separator, endYear, suffix) => {
    const start = Number.parseInt(startYear, 10);
    const end = endYear ? Number.parseInt(endYear, 10) : start;

    if (Number.isNaN(start) || Number.isNaN(end)) {
      return `${prefix}${startYear}${endYear ? `${separator}${endYear}` : ''}${suffix}`;
    }

    const resolvedEnd = end >= year ? end : year;

    if (!endYear) {
      // Single year already current — no range needed
      if (resolvedEnd === start) {
        return `${prefix}${startYear}${suffix}`;
      }
      return `${prefix}${startYear} - ${resolvedEnd}${suffix}`;
    }

    // Always normalize separator to ' - ' and bump end year when stale
    return `${prefix}${startYear} - ${resolvedEnd}${suffix}`;
  });
}

export function hasInvalidPingCopyrightHeader(content) {
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    if (!MAYBE_PING_COPYRIGHT_LINE_REGEX.test(line)) {
      continue;
    }
    if (!HEADER_COMMENT_LINE_REGEX.test(line)) {
      continue;
    }
    if (!VALID_PING_COPYRIGHT_LINE_REGEX.test(line)) {
      return true;
    }
  }
  return false;
}

export function hasPingCopyrightHeader(content) {
  const lines = content.split(/\r?\n/);
  for (const line of lines) {
    if (MAYBE_PING_COPYRIGHT_LINE_REGEX.test(line) && HEADER_COMMENT_LINE_REGEX.test(line)) {
      return true;
    }
  }
  return false;
}

const SOURCE_FILE_PATTERN = /\.[cm]?[jt]sx?$/i;

const MAYBE_PING_COPYRIGHT_LINE_REGEX =
  /(?:©\s*|&copy;\s*)?Copyright(?:\s*\(c\))?.*Ping Identity(?: Corporation)?/i;
const HEADER_COMMENT_LINE_REGEX = /^\s*(?:\/\*+|\*+|\/\/+|#+|<!--)\s*/;
const VALID_PING_COPYRIGHT_LINE_REGEX =
  /^.*(?:©\s*|&copy;\s*)?Copyright(?:\s*\(c\))?\s+\d{4}(?:[ \t]*-[ \t]*\d{4})?\s+Ping Identity(?: Corporation)?\b.*$/i;

if (isCliExecution()) {
  run();
}
