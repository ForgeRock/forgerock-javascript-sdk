import { RunTargetsExecutorSchema } from './schema';
import executor from './run.impl';

const options: RunTargetsExecutorSchema = {};

describe('RunTargets Executor', () => {
  it('can run', async () => {
    const output = await executor(options);
    expect(output.success).toBe(true);
  });
});
