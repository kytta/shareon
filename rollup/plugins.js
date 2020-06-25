import path from 'path';

import postcssPluginBanner from 'postcss-banner';
import postcssPluginCssnano from 'cssnano';
import rollupPluginLicense from 'rollup-plugin-license';
import rollupPluginPostcss from 'rollup-plugin-postcss';
import rollupPluginStrip from '@rollup/plugin-strip';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';
import rollupPluginTypescript from '@rollup/plugin-typescript';

const pkg = require(path.join(process.cwd(), 'package.json'));
const bannerText = `${pkg.name} v${pkg.version} by Nikita Karamov
${pkg.homepage}`;

export const license = () => rollupPluginLicense({
  banner: {
    commentStyle: 'ignored',
    content: bannerText
  }
});

/**
 * @param {boolean|string} file
 * @param {boolean} minify
 */
export const postcss = (file = true, minify) => rollupPluginPostcss({
  extract: file,
  plugins: [
    minify && postcssPluginCssnano({
      preset: 'default',
    }),
    postcssPluginBanner({
      banner: bannerText,
      important: true
    })
  ],
});

export const strip = () => rollupPluginStrip({
  debugger: true,
  include: ['**/*.js', '**/*.ts'],
  functions: ['console.log', 'console.debug', 'assert.*'],
  sourceMap: false,
});

export const terser = () => rollupPluginTerser({
  output: {
    comments: false,
    ecma: 5,
  },
});

export const typescript = () => rollupPluginTypescript();
