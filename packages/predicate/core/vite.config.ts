import dts from "vite-plugin-dts";
import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "predicate",
      fileName: "index",
      formats: ["cjs", "es", "iife", "umd"],
    },
  },
  plugins: [dts({ insertTypesEntry: true })],
  resolve: {
    alias: {
      $lib: resolve("src"),
    },
  },
  test: {
    globals: true,
  },
});
