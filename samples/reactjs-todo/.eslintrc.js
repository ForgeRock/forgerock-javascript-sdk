module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@babel/eslint-parser',
  plugins: ['jsx', 'react', 'react-hooks'],
  rules: {
    'no-debugger': 0,
    'no-unused-vars': [2, { varsIgnorePattern: '_' }],
    'react/prop-types': 0,
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
