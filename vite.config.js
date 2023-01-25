import { defineConfig } from "vite";
import * as path from "node:path";
import package_ from "./package.json";

export default defineConfig({
  build: {
    sourcemap: true,
    target: "esnext",
    lib: {
      entry: path.resolve("./src/index.js"),
      name: "Shareon",
      formats: ["es", "umd", "iife"],
      // Workaround to keep the old file names
      fileName: (format, _) => `shareon.${format}.js`,
    },
    rollupOptions: {
      output: {
        banner: `/*! ${package_.name} v${package_.version} */`,
      },
    },
  },
});
