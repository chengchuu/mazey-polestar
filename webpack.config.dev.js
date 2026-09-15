const { merge } = require("webpack-merge");
const baseConf = require("./webpack.config.base");
const path = require("path");

module.exports = merge(baseConf, { /* Development Configuration */
  mode: "development",
  devServer: {
    host: "127.0.0.1",
    static: {
      directory: path.join(__dirname, "lib"),
    },
    compress: true,
    port: 4131,
    hot: false,
    liveReload: true,
    client: {
      webSocketURL: "ws://127.0.0.1:4131/ws",
    },
  },
});
