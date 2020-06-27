module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    '@nuxtjs',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: [
    'prettier'
  ],
  // add your custom rules here
  rules: {
  },
  globals: {
    '$': true,
    'TweenLite': true,
    'TweenMax': true,
    'TimelineMax': true,
    'SplitText': true,
    'Power0': true,
    'Power1': true,
    'Power2': true,
    'Power3': true,
    'Power4': true,
    'Sine': true,
    'Back': true,
    'Bounce': true,
    'SteppedEase': true
  }
}
