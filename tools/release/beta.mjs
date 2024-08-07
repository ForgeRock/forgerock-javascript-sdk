import * as process from 'process';
import { releasePublish, releaseVersion } from 'nx/release/index.js';

await releaseVersion({
  specifier: 'prerelease', // this add the extra .0/1/2/3/* to the version
  preid: 'beta', // for sanity check - set preid to beta
  dryRun: false,
  verbose: false,
  stageChanges: true, // commit changes but no changelog below!
  gitCommit: true, // commit beta is okay.
  gitTag: true, // tag beta so we know what we released
});

// The returned number value from releasePublish will be zero if all projects are published successfully, non-zero if not
const publishStatus = await releasePublish({
  tag: 'beta', // sanity - lets at least tag as beta in case somehow it publishes to npm.
  dryRun: true,
  verbose: false,
  generatorOptionsOverrides: {
    skipLockFileUpdate: true,
  },
});

process.exit(publishStatus);

export {};
