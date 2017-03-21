// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // required for eslint-config-vue
  extends: 'vue',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  globals: {
    '$': true,
    '_': true,
    'utils': true
  }, 
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
