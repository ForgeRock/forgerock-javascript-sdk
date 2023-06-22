import { ExecutorContext } from '@nx/devkit';
import { NxTarget, NxTargetOptions } from './utils/nx-target';

interface Options {
  watch?: boolean;
  targets: NxTargetOptions[];
}

let runningTargets = [];
export default async function runExecutor(options: Options, context: ExecutorContext) {
  let success: boolean;
  const { targets, ...rest } = options;

  runningTargets = targets.map((targetOptions) => new NxTarget(targetOptions));
  await Promise.all(runningTargets.map((nxTarget: NxTarget) => nxTarget.setup()));
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const executor = require('@mands/nx-playwright/src/executors/playwright-executor/executor.js');
    const playwrightExecutor = executor.default;
    success = (
      await playwrightExecutor({
        ...rest,
        e2eFolder: 'e2e',
        config: `${context.projectName}/playwright.config.ts`,
      })
    ).success;
  } catch (err) {
    console.error(err);
    success = false;
  }

  await Promise.all(runningTargets.map((nxTarget) => nxTarget.teardown()));

  return {
    success,
  };
}
process.on('SIGINT', async function () {
  // Kill all targets
  await Promise.all(runningTargets.map((nxTarget) => nxTarget.teardown()));

  process.exit();
});
