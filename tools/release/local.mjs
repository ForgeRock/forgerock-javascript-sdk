import { runServer } from 'verdaccio';
import * as path from 'path';
import * as url from 'url';
import * as console from 'console';

import { releasePublish, releaseVersion } from 'nx/release/index.js';
import { exec } from 'child_process';

const __dirname = url.fileURLToPath(new url.URL('.', import.meta.url));

const app = await runServer(path.resolve(__dirname, '../../.verdaccio/config.yml'));
app.listen(4873, async () => {
  await releaseVersion({
    specifier: 'prerelease', // this add the extra .0/1/2/3/* to the version
    preid: 'beta', // for sanity check - set preid to beta
    dryRun: false,
    verbose: false,
    stageChanges: false,
    gitCommit: false, // for local releases we dont want git
    gitTag: false, // same as above
  });

  // The returned number value from releasePublish will be zero if all projects are published successfully, non-zero if not
  const publishStatus = await releasePublish({
    tag: 'beta', // sanity - lets at least tag as beta in case somehow it publishes to npm.
    dryRun: false,
    verbose: false,
    generatorOptionsOverrides: {
      skipLockFileUpdate: true,
    },
    // DO NOT CHANGE FOR LOCAL! should force publish to verdaccio instance.
    registry: 'http://localhost:4873',
  });
  console.log('Publish status: ', publishStatus === 0 ? 'Success' : 'Failed');
});

export {};
