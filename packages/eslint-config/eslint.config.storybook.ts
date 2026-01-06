import type {Linter} from 'eslint';

export const storybookLintingConfig: Linter.Config = {
  rules: {
    'react-hooks/rules-of-hooks': 'off',
  },
};
