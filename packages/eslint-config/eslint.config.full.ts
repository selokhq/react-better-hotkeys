import {languageLintingConfig} from './eslint.config.language';
import {nodeLintingConfig} from './eslint.config.node.ts';
import {prettierLintingConfig} from './eslint.config.prettier';
import {reactLintingConfig} from './eslint.config.react';
import {storybookLintingConfig} from './eslint.config.storybook.ts';
import {typescriptLintingConfig} from './eslint.config.typescript.ts';

import type {Linter} from 'eslint';

const jsLike: string = 'js,mjs,jsx';
const tsLike: string = 'ts,mts,tsx';
const fileEndings: string = `${jsLike},${tsLike}`;

export const fullLintingConfig: Linter.Config[] = [
  {
    files: [`**/*.{${fileEndings}}`],
    ...languageLintingConfig,
  },
  {
    files: [`**/*.{${tsLike}}`],
    ...typescriptLintingConfig,
  },
  {
    files: [`*.{${fileEndings}}`, `./packages/*/*.{${fileEndings}}`],
    ...nodeLintingConfig,
  },
  {
    files: [`**/*.{${fileEndings}}`],
    ...prettierLintingConfig,
  },
  {
    files: [`**/*.{${fileEndings}}`],
    ...reactLintingConfig,
  },
  {
    files: [`**/*.stories.{${fileEndings}}`],
    ...storybookLintingConfig,
  },
  {ignores: ['**/node_modules/**/*', '**/dist/**/*']},
];

export default fullLintingConfig;
