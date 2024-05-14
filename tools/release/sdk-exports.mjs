import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const sdkPath = path.resolve('./', 'dist/packages/javascript-sdk');
const pkg = fs.readFileSync(`${sdkPath}/package.json`, 'utf8');

const json = JSON.parse(pkg);

json.exports = {
  './src/*': { import: './src/*.js', require: './src/*.cjs' },
  '.': { import: './src/index.js', require: './src/index.cjs' },
  './package.json': './package.json',
};

json.main = './src/index.cjs';
json.module = './src/index.js';

fs.writeFileSync(`${sdkPath}/package.json`, JSON.stringify(json, null, 2));

execSync('npx prettier --write ' + sdkPath + '/package.json');
