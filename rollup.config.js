import buble from '@rollup/plugin-buble';
import consts from '@nickkaramoff/rollup-plugin-consts';
import license from 'rollup-plugin-license';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';

const { urlBuilderMap } = require('./src/networks');

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';

const pkg = require('./package.json');

const outputDir = isDev ? './dev/' : './dist/';

const bannerText = `${pkg.name} v${pkg.version} by Nikita Karamov\n${pkg.homepage}`;

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
  (!isDev) && license({
    banner: {
      commentStyle: 'ignored',
      content: bannerText,
    },
  }),
  (!isDev) && buble({ transforms: { modules: false } }),
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
      file: `${baseDir}${pkg.name}${isDev ? '' : '.min'}.js`,
      plugins: isDev ? [] : [terser({ output: { comments: false } })],
    },
    (!isDev) && {
      ...defaultParameters,
      format: 'cjs',
      file: `${baseDir}${pkg.name}.cjs`,
    },
    (!isDev) && {
      ...defaultParameters,
      format: 'esm',
      file: `${baseDir}${pkg.name}.mjs`,
    },
  ];
};

const config = [
  {
    input: './src/autoinit.js',
    output: getOutput(`${outputDir}`),
    plugins,
  },
  {
    input: './src/shareon.js',
    output: getOutput(`${outputDir}noinit/`),
    plugins,
  },
];

export default config;
