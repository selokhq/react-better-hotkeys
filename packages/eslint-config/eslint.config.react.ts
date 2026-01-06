import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";

import type { ESLint, Linter } from "eslint";

export const reactLintingConfig: Linter.Config = {
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  plugins: {
    react,
    "react-hooks": reactHooks as ESLint.Plugin,
    "react-refresh": reactRefresh,
  },
  rules: {
    ...reactHooks.configs.recommended.rules,
    ...reactRefresh.configs.recommended.rules,
    ...react.configs.recommended.rules,
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "react/jsx-key": "error",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
  },
};
