import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import { configs as lit } from 'eslint-plugin-lit';
import eslintConfigPrettier from 'eslint-config-prettier';
import json from '@eslint/json';
import markdown from '@eslint/markdown';
import storybook from 'eslint-plugin-storybook';
import litA11y from 'eslint-plugin-lit-a11y';
import importX from 'eslint-plugin-import-x';

export default defineConfig([
  { languageOptions: { globals: globals.browser } },
  storybook.configs['flat/recommended'],

  // lint JSON files
  {
    files: ['**/*.json'],
    language: 'json/json',
    extends: [json.configs.recommended],
    rules: {
      'json/no-duplicate-keys': 'error',
      'no-irregular-whitespace': 'off',
    },
  },
  {
    // npm uses "" as the root-package key in the lockfile.
    files: ['package-lock.json'],
    rules: { 'json/no-empty-keys': 'off' },
  },

  // lint MD files
  markdown.configs.recommended,
  {
    files: ['**/*.md'],
    rules: { 'no-irregular-whitespace': 'off' },
  },

  // lint JS/TS files
  tseslint.configs.recommended,
  {
    files: [`**/*.{js,mjs,cjs,ts}`],
    extends: [
      js.configs.recommended,
      lit['flat/recommended'],
      litA11y.configs.recommended,
    ],
    plugins: { 'import-x': importX },
    rules: {
      // Browsers and Node need extensions on relative imports; tsc won't add them.
      'import-x/extensions': ['error', 'ignorePackages'],
    },
  },

  // Build/tooling config runs in Node, not the browser.
  {
    files: [
      `*.{js,mjs,cjs,ts}`,
      `.storybook/**/*.{js,mjs,cjs,ts}`,
      `plop-templates/**/*.{js,mjs,cjs,ts}`,
    ],
    languageOptions: { globals: globals.node },
  },

  // Tests run under Mocha via @web/test-runner.
  {
    files: ['**/*.test.{js,ts}'],
    languageOptions: { globals: globals.mocha },
    rules: {
      // Chai assertions such as `expect(x).to.be.true` are property accesses,
      // which this rule reads as a statement that does nothing.
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },

  // Must stay last so it can turn off rules that conflict with Prettier.
  eslintConfigPrettier,

  globalIgnores([
    '.vscode/*',
    'cdn/*',
    'dist/*',
    'eslint/*',
    'plop-templates/*',
    'public/*',
    'react/*',
    'types/*',
    'custom-elements.json',
    'vscode.css-custom-data.json',
    'vscode.html-custom-data.json',
    'web-types.json',
    'tsconfig.json',
  ]),
]);
