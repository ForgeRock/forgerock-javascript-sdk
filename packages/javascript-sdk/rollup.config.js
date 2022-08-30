// Rollup plugins

module.exports = (config) => {
  config.output.name = 'forgerock';
  config.output.globals = {};
  if (config.output.format === 'umd') {
    config.output.entryFileNames = '[name].umd.js';
    config.output.chunkFileNames = '[name].umd.js';
    return config;
  }
  config.output.entryFileNames = '[name].esm.js';
  config.output.chunkFileNames = '[name].esm.js';

  return config;
};
