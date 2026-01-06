import importPlugin from 'eslint-plugin-import';
import unusedImportPlugin from 'eslint-plugin-unused-imports';
import globals from 'globals';

import type {Linter} from 'eslint';

export const languageLintingConfig: Linter.Config = {
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parserOptions: {
      projectService: true,
    },
  },
  plugins: {
    import: importPlugin,
    'unused-imports': unusedImportPlugin,
  },
  rules: {
    // ...importPlugin.configs.recommended.rules,
    // ...unusedImportPlugin.rules,
    'no-console': 'off',
  },
};
