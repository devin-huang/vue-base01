module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es6': true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended',
    'standard'
  ],
  'parserOptions': {
    parser: 'babel-eslint',
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2015,
    'sourceType': 'module'
  },
  'rules': {
    'indent': [
      'error',
      2
    ],
    'linebreak-style': [
      'error',
      'windows'
    ],
    'quotes': [
      'error',
      'single'
    ],
    'semi': [
      'error',
      'never'
    ],
    'no-console': 'off',
    'eqeqeq': 'warn'
  }
}