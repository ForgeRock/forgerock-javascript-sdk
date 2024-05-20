import * as console from 'console';

import { releasePublish, releaseVersion } from 'nx/release/index.js';
import { execSync } from 'child_process';

execSync('npx npm-cli-login -u test -p 1234 -e test@domain.test -r https://npm.petrov.ca');

const { workspaceVersion, projectsVersionData } = await releaseVersion({
  specifier: 'prerelease', // this add the extra .0/1/2/3/* to the version
  preid: 'regression',
  dryRun: false,
  verbose: false,
  stageChanges: false,
  gitCommit: true,
  gitTag: true,
});

execSync('npx nx run-many -t build --projects=tag:scope:package');

console.log('Releasing following versions in verdaccio: ', projectsVersionData);
console.log('Workspace version (root package.json) should match: ', workspaceVersion);

// The returned number value from releasePublish will be zero if all projects are published successfully, non-zero if not
const publishStatus = await releasePublish({
  tag: 'regression',
  dryRun: false,
  verbose: false,
  generatorOptionsOverrides: {
    skipLockFileUpdate: true,
  },
  registry: 'https://npm.petrov.ca',
});

console.log('Publish status: ', publishStatus === 0 ? 'Success' : 'Failed');

export {};
