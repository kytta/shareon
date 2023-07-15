/*!
 * SVGO configuration from simple-icons, modified.
 *
 * See: https://github.com/simple-icons/simple-icons/blob/4e36921e759278e83f2e6775e0fb78ba76131eec/svgo.config.mjs
 */

export default {
  multipass: true,
  eol: "lf",
  plugins: [
    "cleanupAttrs",
    "mergeStyles",
    "minifyStyles",
    "inlineStyles",
    "removeDoctype",
    "removeXMLProcInst",
    "removeComments",
    "removeMetadata",
    "removeDesc",
    "removeUselessDefs",
    "removeEditorsNSData",
    "removeEmptyAttrs",
    "removeHiddenElems",
    "removeEmptyText",
    "removeEmptyContainers",
    "convertStyleToAttrs",
    "convertColors",
    "cleanupEnableBackground",
    {
      name: "convertPathData",
      params: {
        // 3 decimals of precision in floating point numbers
        floatPrecision: 3,
      },
    },
    "convertTransform",
    {
      name: "removeUnknownsAndDefaults",
    },
    "removeUselessStrokeAndFill",
    "removeNonInheritableGroupAttrs",
    "removeUnusedNS",
    "cleanupIds",
    "cleanupNumericValues",
    "cleanupListOfValues",
    "collapseGroups",
    "removeRasterImages",
    {
      // Compound all <path>s into one
      name: "mergePaths",
      params: {
        force: true,
      },
    },
    {
      // Convert basic shapes (such as <circle>) to <path>
      name: "convertShapeToPath",
      params: {
        // including <arc>
        convertArcs: true,
      },
    },
    "convertEllipseToCircle",
    {
      // Sort the attributes on the <svg> tag
      name: "sortAttrs",
      params: {
        order: ["fill", "stroke", "viewBox"],
        xmlnsOrder: "end",
      },
    },
    "sortDefsChildren",
    "removeDimensions",

    {
      name: "removeAttrs",
      params: {
        attrs: ["svg:(?!(role|xmlns))", "path:(?!d)"],
      },
    },
    {
      name: "addAttributesToSVGElement",
      params: {
        attributes: [{ xmlns: "http://www.w3.org/2000/svg" }],
      },
    },
    "removeOffCanvasPaths",
    "removeStyleElement",
    "removeScriptElement",
    "removeTitle",
  ],
};
