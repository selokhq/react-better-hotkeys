import tsEslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

import type { Linter } from "eslint";

export const typescriptLintingConfig: Linter.Config = {
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      projectService: true,
    },
  },
  plugins: {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    "@typescript-eslint": tsEslint,
  },
  rules: {
    ...tsEslint.configs.strict?.rules,

    // only needed rule from 'unused-imports'
    "unused-imports/no-unused-imports": "error",

    // rules not covered by @typescript-eslint's recommended
    "@typescript-eslint/no-shadow": "off",
    "@typescript-eslint/no-unnecessary-condition": "warn",

    "@typescript-eslint/consistent-type-imports": "error",

    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        vars: "all", // "all" removes all unused variables, "local" only removes locally scoped ones
        varsIgnorePattern: "^_", // Ignore variables prefixed with an underscore (e.g., `_unusedVar`)
        args: "after-used", // Check arguments after they are used
        argsIgnorePattern: "^_", // Ignore arguments prefixed with an underscore
      },
    ],
  },
};
