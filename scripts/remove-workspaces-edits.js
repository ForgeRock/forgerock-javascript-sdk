const path = require('path');
const { readFileSync, writeFileSync } = require('fs');

const pkgPath = path.resolve(__dirname, '../package.json');
const file = readFileSync(pkgPath, 'utf8');
const packageJson = JSON.parse(file);

const workspaces = packageJson.workspaces;
const parentDir = 'dist/';

// a stupid check to make sure we have workspaces starting with `dist/`
if (packageJson.workspaces[0].startsWith(parentDir)) {
  packageJson.workspaces = workspaces.map((workspace) => workspace.slice(parentDir.length));
  writeFileSync(pkgPath, JSON.stringify(packageJson, null, 2), 'utf8');
}
