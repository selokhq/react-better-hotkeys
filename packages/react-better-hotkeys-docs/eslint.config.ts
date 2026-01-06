import type { Linter } from "eslint";
import { full } from "@repo/eslint-config";

const config: Linter.Config[] = [
  ...full,
  {
    ignores: ["build"],
  },
  {
    files: ["./docs/assets/code/**/*"],
    rules: {
      "@typescript-eslint/no-unused-vars": "off",
      "react-refresh/only-export-components": "off",
      "react-hooks/rules-of-hooks": "off",
      "@typescript-eslint/no-unused-expressions": "off",
    },
  },
] satisfies Linter.Config[];

export default config;
