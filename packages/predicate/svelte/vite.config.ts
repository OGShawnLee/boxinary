import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "predicate",
      fileName: (format) => (format === "umd" ? "index.umd.cjs" : "index.js"),
      formats: ["es", "umd"],
    },
  },
  resolve: {
    alias: {
      $lib: resolve(__dirname, "src"),
    },
  },
});
