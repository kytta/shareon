const pkg = require("./package.json");
const bannerText = `${pkg.name} v${pkg.version}`;

module.exports = {
  map: {
    inline: false,
  },
  plugins: [
    require("postcss-css-variables"),
    require("postcss-calc"),
    require("cssnano")({
      preset: "default",
    }),
    require("autoprefixer"),
    require("postcss-banner")({
      banner: bannerText,
      important: true,
      inline: true,
    }),
  ],
};
