import prettierPlugin from 'eslint-plugin-prettier';

import type {Linter} from 'eslint';

export const prettierLintingConfig: Linter.Config = {
  plugins: {
    prettier: prettierPlugin,
  },
  rules: {
    'prettier/prettier': ['error'],
  },
};
