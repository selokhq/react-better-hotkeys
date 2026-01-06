import globals from 'globals';

import type {Linter} from 'eslint';

export const nodeLintingConfig: Linter.Config = {
  languageOptions: {
    globals: globals.node,
  },
};
