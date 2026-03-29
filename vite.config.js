import { defineConfig } from "vite";
import * as path from "node:path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve("./src/index.js"),
      name: "Shareon",
      formats: ["es", "umd", "iife"],
      // Workaround to keep the old file names
      fileName: (format) => `shareon.${format}.js`,
      cssFileName: "shareon.min",
    },
  },
  css: {
    devSourcemap: true,
  },
});
