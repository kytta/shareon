import license from 'rollup-plugin-license';
import postcss from 'rollup-plugin-postcss';
import postcssPluginBanner from 'postcss-banner';
import postcssPluginCssnano from 'cssnano';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';

const pkg = require('./package.json');

const inputFile = './src/index.ts';
const outputDir = isDev ? './dev' : './dist/';

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
  extract: `${pkg.name}.css`,
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

const output = [];

if (isDev) {
  output.push({
    name: pkg.name,
    format: 'iife',
    file: `${outputDir}${pkg.name}.js`,
  });
} else {
  output.push({
    name: pkg.name,
    format: 'cjs',
    file: `${outputDir}${pkg.name}.cjs`,
  });
  output.push({
    name: pkg.name,
    format: 'esm',
    file: `${outputDir}${pkg.name}.mjs`,
  });
  output.push({
    name: pkg.name,
    format: 'iife',
    file: `${outputDir}${pkg.name}.min.js`,
    plugins: [terser({ output: { comments: false } })],
  });
}

/*
 * EXPORT
 */

export default {
  input: inputFile,
  output,
  plugins,
};
