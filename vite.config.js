import { defineConfig } from "vite";
import * as path from "node:path";
import package_ from "./package.json";

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
    rollupOptions: {
      output: {
        banner: `/*! ${package_.name} v${package_.version} */`,
      },
    },
  },
});
