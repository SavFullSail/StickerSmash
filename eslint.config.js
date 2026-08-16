// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');
const { allExtensions } = require('eslint-config-expo/flat/utils/extensions');

module.exports = defineConfig([
  expoConfig,
  {
    files: ['**/*.{ts,tsx}'],
    settings: {
      'import/resolver': {
        typescript: { extensions: allExtensions },
      },
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
