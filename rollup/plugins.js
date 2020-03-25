import rollupPluginStrip from '@rollup/plugin-strip';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';
import rollupPluginTypescript from '@rollup/plugin-typescript';

export const strip = () => rollupPluginStrip({
  debugger: true,
  functions: ['console.log', 'console.debug'],
  sourceMap: false,
});

export const terser = () => rollupPluginTerser({
  sourcemap: false,
  output: {
    comments: false,
    ecma: 5,
  },
});

export const typescript = () => rollupPluginTypescript();
