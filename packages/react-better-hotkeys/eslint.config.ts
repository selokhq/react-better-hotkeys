import type { Linter } from "eslint";
import { full } from "@repo/eslint-config";

const config: Linter.Config[] = [
  ...full,
  {
    ignores: ["dist"],
  },
  {
    languageOptions: {
      parserOptions: {
        projectService: false,
        project: "tsconfig.test.json",
        tsconfigRootDir: __dirname,
      },
    },
    files: ["src/test/**/*"],
  },
] satisfies Linter.Config[];

export default config;
