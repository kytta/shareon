import { banner, postcss, strip, terser, typescript } from './plugins';

const input = './src/index.ts';
const name = 'shareon';
const outputDir = './dist/';


export default {
  input,
  output: [
    {
      name,
      format: 'cjs',
      file: `${outputDir}${name}.cjs`,
    },
    {
      name,
      format: 'iife',
      file: `${outputDir}${name}.min.js`,
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript(),
    strip(),
    postcss(`${outputDir}${name}.min.css`, true),
    banner()
  ],
};
