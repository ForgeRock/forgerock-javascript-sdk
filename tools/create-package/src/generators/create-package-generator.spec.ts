import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, readProjectConfiguration } from '@nx/devkit';

import { createPackageGeneratorGenerator } from './create-package-generator';
import { CreatePackageGeneratorGeneratorSchema } from './schema';
import { beforeEach, describe, expect, it } from 'vitest';

describe('create-package-generator generator', () => {
  let tree: Tree;
  const options: CreatePackageGeneratorGeneratorSchema = { name: 'test' };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should run successfully', async () => {
    await createPackageGeneratorGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
  });
});
