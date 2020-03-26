import postcssPluginCssnano from 'cssnano';
import rollupPluginBanner from 'rollup-plugin-banner';
import rollupPluginPostcss from 'rollup-plugin-postcss';
import rollupPluginStrip from '@rollup/plugin-strip';
import { terser as rollupPluginTerser } from 'rollup-plugin-terser';
import rollupPluginTypescript from '@rollup/plugin-typescript';

export const banner = () => rollupPluginBanner(
  '<%= pkg.name %> by Nikita Karamov\nInspired by Likely (https://ilyabirman.net/projects/likely/)'
)

export const postcss = (file, minify) => rollupPluginPostcss({
  extract: file || true,
  plugins: [
    minify && postcssPluginCssnano({
      preset: 'default',
    })
  ],
})

export const strip = () => rollupPluginStrip({
  debugger: true,
  include: ['**/*.js', '**/*.ts'],
  functions: ['console.log', 'console.debug', 'assert.*'],
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
