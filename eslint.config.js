// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    settings: {
      'import/resolver': {
        node: {
          extensions: [
            '.ios.js',
            '.ios.jsx',
            '.native.js',
            '.native.jsx',
            '.web.js',
            '.web.jsx',
            '.js',
            '.jsx',
            '.json',
          ],
        },
        typescript: {
          extensions: [
            '.ios.ts',
            '.ios.tsx',
            '.native.ts',
            '.native.tsx',
            '.web.ts',
            '.web.tsx',
            '.ts',
            '.tsx',
            '.d.ts',
            '.js',
            '.jsx',
            '.json',
          ],
        },
      },
    },
  },
  {
    ignores: ['dist/*'],
  },
]);
