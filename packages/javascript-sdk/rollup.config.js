module.exports = (config) => {
  config.output = {
    ...config.output,
    preserveModules: true,
    preserveModulesRoot: 'packages/javascript-sdk',
  };
  return config;
};
