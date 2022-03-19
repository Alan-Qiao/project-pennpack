module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/prop-types': 'off',
    'linebreak-style': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
  },
};
