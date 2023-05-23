#!/usr/bin/env node
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const pkgPath = path.resolve(__dirname, '../dist/packages/javascript-sdk/package.json');
const pkgJson = readFileSync(pkgPath);

const packageJson = JSON.parse(pkgJson);

packageJson.module = './src/index.js';
packageJson.main = './src/index.cjs';

writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2));
