// 用於設定 style-component babel 參數
const rewireStyledComponents = require("react-app-rewire-styled-components");
const rewireWebpackBundleAnalyzer = require("react-app-rewire-webpack-bundle-analyzer");

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env, {
    // 開發時啟用，產生 build 版本時停用
    displayName: env !== "production",
  });
  if (env === "production") {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: "server",
      reportFilename: "report.html",
    });
  }
  return config;
};
