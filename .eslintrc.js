module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  extends: 'vue', // <--- add this for .vue
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  env: {
    browser: true
  },
  globals: {
    '_': true,
    'utils': true
  }, 
  // add your custom rules here
  'rules': {
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}