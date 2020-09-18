/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable global-require */

const pkg = require('./package.json');

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';
const bannerText = `${pkg.name} v${pkg.version} by Nikita Karamov\n${pkg.homepage}`;

const plugins = [
  require('postcss-mixins')({
    mixins: {
      networks: require('./src/networksMixin'),
    },
  }),
  require('postcss-css-variables'),
  require('postcss-calc'),
];

if (!isDev) {
  plugins.push(
    require('cssnano')({
      preset: 'default',
    }),
    require('autoprefixer'),
    require('postcss-banner')({
      banner: bannerText,
      important: true,
    }),
  );
}

module.exports = {
  plugins,
};
