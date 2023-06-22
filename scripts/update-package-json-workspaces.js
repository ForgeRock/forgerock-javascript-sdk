const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const pkgPath = path.resolve(__dirname, '../package.json');
const file = readFileSync(pkgPath, 'utf8');
const packageJson = JSON.parse(file);

const workspaces = packageJson.workspaces;

packageJson.workspaces = workspaces.map((workspace) => `dist/${workspace}`);

writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2), 'utf8');
