const path = require('path');

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');

const autoprefixer = require('autoprefixer');
const banner = require('postcss-banner');
const calc = require('postcss-calc');
const cssnano = require('cssnano');
const cssVariables = require('postcss-css-variables');
const mixins = require('postcss-mixins');

const rollup = require('rollup');
const loadConfigFile = require('rollup/dist/loadConfigFile');

const pkg = require('./package.json');
const networks = require('./src/networksMixin');

const isDev = process.env.ROLLUP_WATCH || process.env.NODE_ENV === 'development';
const bannerText = `${pkg.name} v${pkg.version} by Nikita Karamov\n${pkg.homepage}`;

async function js() {
  const { options, warnings } = await loadConfigFile(
    path.resolve(__dirname, 'rollup.config.js'),
  );

  if (warnings.count > 0) {
    // eslint-disable-next-line no-console
    console.warn(`${warnings.count} warnings`);
    warnings.flush();
  }

  const allOutputs = [];

  options.forEach((optionObj) => {
    optionObj.output.forEach((outputObj) => {
      allOutputs.push([rollup.rollup(optionObj), outputObj]);
    });
  });

  await Promise.all(allOutputs.map(
    ([bundlePromise, outputObj]) => bundlePromise.then((bundle) => bundle.write(outputObj)),
  ));
}

async function css() {
  gulp.src(path.resolve(__dirname, 'src', 'style.css'))
    .pipe(postcss({
      plugins: [
        mixins({
          mixins: {
            networks,
          },
        }),
        cssVariables,
        calc,
        (!isDev) && cssnano({
          preset: 'default',
        }),
        autoprefixer,
        banner({
          banner: bannerText,
          important: true,
        }),
      ],
    }))
    .pipe(rename({
      basename: pkg.name,
      extname: isDev ? '.css' : '.min.css',
    }))
    .pipe(gulp.dest(path.resolve(__dirname, isDev ? 'dev' : 'dist')));
}

exports.default = gulp.parallel(js, css);
exports.dev = function dev() {
  gulp.watch('src/networks*.js', gulp.parallel(js, css));
  gulp.watch('src/shareon.js', js);
  gulp.watch('src/autoinit.js', js);
  gulp.watch('src/style.css', css);
};
