import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import postcssPluginBanner from 'postcss-banner';
import postcssPluginCssnano from 'cssnano';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';

const pkg = require('./package.json');

const outputDir = isDev ? './dev/' : './dist/';

const bannerText = `${pkg.name} v${pkg.version} by Nikita Karamov\n${pkg.homepage}`;

/**
 * Plugins to build the project
 *
 * @type {Plugin[]}
 */
const plugins = [
  typescript(),
];

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

/**
 * @typedef {import('rollup').OutputOptions} OutputOptions
 */

/**
 *
 * @param {string} baseDir base directory for the output files
 * @return {OutputOptions[]} array of outputs
 */
const getOutputs = (baseDir) => {
  const defaultParameters = {
    name: pkg.name,
    exports: 'default',
  };
  const result = [];

  if (isDev) {
    result.push({
      ...defaultParameters,
      format: 'iife',
      file: `${baseDir}${pkg.name}.js`,
    });
  } else {
    result.push({
      ...defaultParameters,
      format: 'cjs',
      file: `${baseDir}${pkg.name}.cjs`,
    });
    result.push({
      ...defaultParameters,
      format: 'esm',
      file: `${baseDir}${pkg.name}.mjs`,
    });
    result.push({
      ...defaultParameters,
      format: 'iife',
      file: `${baseDir}${pkg.name}.min.js`,
      plugins: [terser({ output: { comments: false } })],
    });
  }

  return result;
};

const config = [
  {
    input: './src/autoinit.ts',
    output: getOutputs(`${outputDir}`),
    plugins,
  },
  {
    input: './src/shareon.ts',
    output: getOutputs(`${outputDir}noinit/`),
    plugins: plugins.slice(0, -1),
  },
];

export default config;
