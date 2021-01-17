import { join, resolve } from 'path';

import buble from '@rollup/plugin-buble';
import consts from '@nickkaramoff/rollup-plugin-consts';
import strip from '@rollup/plugin-strip';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';

const autoprefixer = require('autoprefixer');
const banner = require('postcss-banner');
const calc = require('postcss-calc');
const cssnano = require('cssnano');
const cssVariables = require('postcss-css-variables');
const mixins = require('postcss-mixins');

const networks = require('./src/networksMixin');
const { urlBuilderMap } = require('./src/networks');
const pkg = require('./package.json');

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';
const outputDir = resolve('.', 'dist');
const bannerText = `${pkg.name} v${pkg.version}`;

const postcssPlugins = [
  mixins({
    mixins: {
      networks,
    },
  }),
  cssVariables,
  calc,
];

if (!isDev) {
  postcssPlugins.push(
    cssnano({
      preset: 'default',
    }),
    autoprefixer(),
    banner({
      banner: bannerText,
      important: true,
      inline: true,
    }),
  );
}

const getPlugins = (css) => [
  consts({
    urlBuilderMap,
  }),
  css && postcss({
    extract: resolve(join(outputDir, 'shareon.min.css')),
    plugins: postcssPlugins,
  }),
  (!isDev) && strip({
    debugger: true,
    include: ['**/*.js'],
    functions: ['console.log', 'console.debug', 'assert.*'],
    sourceMap: false,
  }),
  (!isDev) && buble({
    transforms: {
      modules: false,
    },
  }),
];

const getOutput = (baseDir) => {
  const defaultParameters = {
    name: pkg.name,
    exports: 'default',
  };

  return [
    {
      ...defaultParameters,
      format: 'iife',
      file: join(baseDir, `${pkg.name}${isDev ? '' : '.min'}.js`),
      plugins: isDev ? [] : [terser({ output: { comments: /^!/ } })],
      banner: `/*! ${bannerText} */`,
    },
    (!isDev) && {
      ...defaultParameters,
      format: 'cjs',
      file: join(baseDir, `${pkg.name}.cjs`),
      banner: `/*! ${bannerText} */`,
    },
    (!isDev) && {
      ...defaultParameters,
      format: 'esm',
      file: join(baseDir, `${pkg.name}.mjs`),
      banner: `/*! ${bannerText} */`,
    },
  ];
};

export default [
  {
    input: join(__dirname, 'src', 'autoinit.js'),
    output: getOutput(outputDir),
    plugins: getPlugins(true),
  },
  {
    input: join(__dirname, 'src', 'shareon.js'),
    output: getOutput(join(outputDir, 'noinit')),
    plugins: getPlugins(false),
  },
];
