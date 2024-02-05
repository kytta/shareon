import { readFile } from "node:fs/promises";

import postcss from "postcss";
import cssVariables from "postcss-css-variables";
import calc from "postcss-calc";

/** @type {Map<string, string>} */
export const formatToJsExtension = new Map([
  ["esm", ".mjs"],
  ["cjs", ".cjs"],
  ["iife", ".iife.js"],
]);

/** @type {import("esbuild").Plugin} */
const postcssPlugin = {
  name: "postcss",
  async setup(build) {
    const postcssInstance = postcss([cssVariables(), calc()]);

    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await readFile(args.path);

      const result = await postcssInstance.process(css, {
        from: args.path,
      });

      return {
        contents: result.css,
        loader: "css",
      };
    });
  },
};

/** @type {import("esbuild").BuildOptions} */
export const commonOptions = {
  sourcemap: true,
  bundle: true,
  loader: {
    ".svg": "dataurl",
  },
  plugins: [postcssPlugin],
  entryNames: "[dir]/shareon",
  globalName: "Shareon",
  target: ["es2019"],
};
