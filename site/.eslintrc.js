module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/airbnb',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'max-len': [
      'off',
      {
        code: 200,
        tabWidth: 4,
        ignoreUrls: true,
      },
    ],
    'vuejs-accessibility/label-has-for': 'off',
    'no-plusplus': 'off',
  },

};
