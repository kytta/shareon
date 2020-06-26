import { postcss, typescript } from './plugins';

const input = './src/index.ts';
const name = 'shareon';
const outputDir = './dev/';

export default {
  input,
  output: {
    name,
    format: 'iife',
    file: `${outputDir}${name}.js`,
  },
  plugins: [
    typescript(),
    postcss(`${name}.css`, false),
  ],
};
