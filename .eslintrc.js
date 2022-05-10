module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-native/all',
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
    'react-native',
    '@typescript-eslint',
    'jest',
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    'react/jsx-indent': 'off',
    'react/prop-types': 'off',
    'linebreak-style': 'off',
    'object-curly-newline': 'off',
    'no-underscore-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-param-reassign': ['error', { props: false }],
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'no-plusplus': 'off',
    'no-use-before-define': 'off',
    'react/no-array-index-key': 'off',
    'react-native/no-color-literals': 'off',
    'react-native/no-inline-styles': 'off',
  },
};
