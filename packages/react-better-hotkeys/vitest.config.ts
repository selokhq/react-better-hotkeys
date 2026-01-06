/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import viteTsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    dts({
      tsconfigPath: "tsconfig.test.json",
      entryRoot: "src/lib",
      exclude: ["node_modules/**", "dist/**"],
    }),
  ],
  test: {
    isolate: true,
    pool: "forks",
    globals: true,
    environment: "jsdom",
    typecheck: {
      tsconfig: "tsconfig.test.json",
    },
  },
});
