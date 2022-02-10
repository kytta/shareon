import { defineConfig } from "vite";
import * as path from "path";

export default defineConfig({
  esbuild: {
    minify: true,
  },
  build: {
    sourcemap: true,
    target: "esnext",
    minify: "terser",
    lib: {
      entry: path.resolve("./src/index.js"),
      name: "Shareon",
      formats: ["es", "umd", "iife"],
    },
  },
});
