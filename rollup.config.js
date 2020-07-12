import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import postcssPluginBanner from 'postcss-banner';
import postcssPluginCssnano from 'cssnano';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';

const pkg = require('./package.json');

const mainFile = './src/index.ts';
const rendererFile = './src/container.ts';
const outputDir = isDev ? './dev/' : './dist/';

const bannerText = `${pkg.name} v${pkg.version} by Nikita Karamov\n${pkg.homepage}`;

/*
 * PLUGINS
 */

const plugins = [];

plugins.push(typescript());

if (!isDev) {
  plugins.push(strip({
    debugger: true,
    include: ['**/*.js', '**/*.ts'],
    functions: ['console.log', 'console.debug', 'assert.*'],
    sourceMap: false,
  }));

  plugins.push(license({
    banner: {
      commentStyle: 'ignored',
      content: bannerText,
    },
  }));
}

plugins.push(postcss({
  extract: `${pkg.name}.min.css`,
  plugins: [
    (!isDev) && postcssPluginCssnano({
      preset: 'default',
    }),
    postcssPluginBanner({
      banner: bannerText,
      important: true,
    }),
  ],
}));

/*
 * OUTPUTS
 */

/** @type {Array<import('rollup').RollupOptions>} */
const config = [];

if (isDev) {
  config.push({
    input: mainFile,
    output: {
      name: pkg.name,
      format: 'iife',
      file: `${outputDir}${pkg.name}.js`,
    },
    plugins,
  });
} else {
  config.push({
    input: rendererFile,
    output: {
      name: pkg.name,
      format: 'cjs',
      file: `${outputDir}${pkg.name}.cjs`,
    },
    plugins,
  });
  config.push({
    input: rendererFile,
    output: {
      name: pkg.name,
      format: 'esm',
      file: `${outputDir}${pkg.name}.mjs`,
    },
    plugins,
  });
  config.push({
    input: mainFile,
    output: {
      name: pkg.name,
      format: 'iife',
      file: `${outputDir}${pkg.name}.min.js`,
    },
    plugins: plugins.concat(terser({ output: { comments: false } })),
  });
}

/*
 * EXPORT
 */

export default config;
