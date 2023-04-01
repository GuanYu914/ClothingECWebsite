// 用於設定 style-component babel 參數
const rewireWebpackBundleAnalyzer = require("react-app-rewire-webpack-bundle-analyzer");

/* config-overrides.js */
module.exports = function override(config, env) {
  if (env === "production") {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: "server",
      reportFilename: "report.html",
    });
  }
  return config;
};
