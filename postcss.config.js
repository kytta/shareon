const package_ = require("./package.json");
const bannerText = `${package_.name} v${package_.version}`;

module.exports = {
  map: {
    inline: false,
  },
  plugins: [
    require("postcss-css-variables"),
    require("postcss-calc"),
    require("autoprefixer"),
    require("postcss-csso"),
    require("postcss-banner")({
      banner: bannerText,
      important: true,
      inline: true,
    }),
  ],
};
