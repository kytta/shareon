/* eslint-disable import/no-extraneous-dependencies */
const autoprefixer = require('autoprefixer');
const calc = require('postcss-calc');
const cssnano = require('cssnano');
const cssVariables = require('postcss-css-variables');

const isDev = process.env.NODE_ENV === 'development';

const postcssPlugins = [
  cssVariables,
  calc,
];

if (!isDev) {
  postcssPlugins.push(
    cssnano({
      preset: 'default',
    }),
    autoprefixer(),
  );
}

module.exports = {
  plugins: postcssPlugins,
};
