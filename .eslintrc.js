/**
 * .eslint.js
 *
 * ESLint configuration file.
 */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  plugins: [],
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript',
    './.eslintrc-auto-import.json',
  ],
  rules: {
    'no-tabs': 'off',
    'vue/comment-directive': 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
  },
}
