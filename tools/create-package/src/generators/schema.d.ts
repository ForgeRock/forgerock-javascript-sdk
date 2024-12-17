export interface CreatePackageGeneratorGeneratorSchema {
  name: string;
  packageScope?: string;
  description?: string;
  sideEffects?: boolean;
  outputDir?: string;
  moduleType?: 'module' | 'commonjs';
}
