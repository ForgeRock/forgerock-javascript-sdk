import { runServer } from 'verdaccio';
import * as path from 'path';
import * as url from 'url';
import * as console from 'console';

import { releasePublish, releaseVersion } from 'nx/release/index.js';
import { execSync } from 'child_process';

const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

const app = await runServer(path.resolve(__dirname, '../../.verdaccio/config.yml'));
app.listen(4873, async () => {
  execSync('npx npm-cli-login -u test -p 1234 -e test@domain.test -r https://npm.petrov.ca');
  const { workspaceVersion, projectsVersionData } = await releaseVersion({
    specifier: 'prerelease', // this add the extra .0/1/2/3/* to the version
    preid: 'beta', // for sanity check - set preid to beta
    dryRun: false,
    verbose: false,
    stageChanges: false,
    gitCommit: false,
    gitTag: false,
  });
  execSync('npx nx run-many -t build --projects=tag:scope:package');
  console.log('Releasing following versions in verdaccio: ', projectsVersionData);
  console.log('Workspace version (root package.json) should match: ', workspaceVersion);
  // The returned number value from releasePublish will be zero if all projects are published successfully, non-zero if not
  const publishStatus = await releasePublish({
    tag: 'beta', // sanity - lets at least tag as beta in case somehow it publishes to npm.
    dryRun: false,
    verbose: false,
    generatorOptionsOverrides: {
      skipLockFileUpdate: true,
    },
    registry: 'https://npm.petrov.ca',
  });
  console.log('Publish status: ', publishStatus === 0 ? 'Success' : 'Failed');
});

export {};
