module.exports = {
  map: {
    inline: false,
  },
  plugins: [
    require("postcss-css-variables"),
    require("postcss-calc"),
    require("autoprefixer"),
    require("postcss-csso"),
  ],
};
