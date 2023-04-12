module.exports = {
  arrowParens: 'always',
  printWidth: 100,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  overrides: [
    {
      files: ['*.json'],
      parser: 'json',
      trailingComma: 'none',
      singleQuote: false,
      printWidth: 80,
      tabWidth: 2,
    },
  ],
};
