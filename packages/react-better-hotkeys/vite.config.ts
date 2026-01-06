/// <reference types="vite/client" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import dts from "vite-plugin-dts";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteTsconfigPaths(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      entryRoot: "src/lib",
      exclude: ["node_modules/**", "dist/**"],
    }),
  ],
  build: {
    copyPublicDir: false,
    minify: true,
    cssCodeSplit: true,
    lib: {
      entry: resolve(__dirname, "src/lib/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      treeshake: false,
      external: ["react", "react/jsx-runtime", "react-dom"],
      input: "src/lib/index.ts",
      output: {
        assetFileNames: "[name][extname]",
        entryFileNames: "[name].js",
        preserveModules: true,
        preserveModulesRoot: "src/lib",
      },
    },
  },
});
