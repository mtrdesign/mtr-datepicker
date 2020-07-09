module.exports = {
  env: {
    browser: true,
    es2020: true,
    jasmine: true
  },
  extends: [
    'standard',
    'plugin:jasmine/recommended'
  ],
  parserOptions: {
    ecmaVersion: 11
  },
  plugins: [
    'jasmine'
  ],
  globals: {
    MtrDatepicker: true,
    MtrDatepickerTimezones: true,
    jQuery: true,
    $: true,
    setFixtures: true,
    spyOnEvent: true,
    createClickEvent: true,
    createCustomEvent: true,
    createWheelEvent: true,
    createKeyupEvent: true
  },
  rules: {
    semi: 'off'
  }
}
