module.exports = {
  env: {
    browser: false,
    node: true,
    jest: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  plugins: ['vue'],
  settings: {
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', 'src'],
      },
    },
  },
  rules: {
    'no-shadow': 'off',
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    'arrow-parens': 'off',
  },
}
