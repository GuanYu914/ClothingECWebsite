// 用於設定 style-component babel 參數
const rewireStyledComponents = require("react-app-rewire-styled-components");
const rewireWebpackBundleAnalyzer = require("react-app-rewire-webpack-bundle-analyzer");

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireStyledComponents(config, env, {
    // 開啟 styled-component 的模組名稱，方便 debug
    displayName: false,
  });
  if (env === "production") {
    config = rewireWebpackBundleAnalyzer(config, env, {
      analyzerMode: "server",
      reportFilename: "report.html",
    });
  }
  return config;
};
