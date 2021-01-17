import { join } from 'path';

import buble from '@rollup/plugin-buble';
import consts from '@nickkaramoff/rollup-plugin-consts';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';

const { urlBuilderMap } = require('./src/networks');

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';

const pkg = require('./package.json');

const outputDir = join(__dirname, 'dist');

const banner = `/*! ${pkg.name} v${pkg.version} */`;

const plugins = [
  consts({
    urlBuilderMap,
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
      banner,
    },
    (!isDev) && {
      ...defaultParameters,
      format: 'cjs',
      file: join(baseDir, `${pkg.name}.cjs`),
      banner,
    },
    (!isDev) && {
      ...defaultParameters,
      format: 'esm',
      file: join(baseDir, `${pkg.name}.mjs`),
      banner,
    },
  ];
};

export default [
  {
    input: join(__dirname, 'src', 'autoinit.js'),
    output: getOutput(outputDir),
    plugins,
  },
  {
    input: join(__dirname, 'src', 'autoinit.js'),
    output: getOutput(join(outputDir, 'noinit')),
    plugins,
  },
];
