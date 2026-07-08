const path = require("path");
const webpack = require("webpack");
const { genCustomConsole } = require("mazey");

const WebpackCon = genCustomConsole("WebpackCon:");
const ENTRY = process.env.ENTRY;
WebpackCon.log(`ENTRY ${ENTRY}`);
const ENTRY_FILE = `./src/${ENTRY}.js` || "./src/index.js";
WebpackCon.log(`ENTRY_PATH ${ENTRY_FILE}`);

const userscriptHeaders = {
  webhook: `// ==UserScript==
// @name         Telegram Webhook Monitor
// @namespace    https://github.com/chengchuu/webpack-build-demo
// @version      0.1.0
// @description  Scan Telegram Web messages and send new readable messages to a webhook relay.
// @match        https://web.telegram.org/*
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @connect      bilijili.com
// ==/UserScript==`,
};

const plugins = [];

if (userscriptHeaders[ENTRY]) {
  plugins.push(new webpack.BannerPlugin({
    banner: userscriptHeaders[ENTRY],
    raw: true,
    entryOnly: true,
  }));
}

const config = {
  entry: {
    [ENTRY]: ENTRY_FILE,
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "lib"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins,
};

if (ENTRY === "webhook") {
  config.optimization = {
    minimize: false,
  };
}

module.exports = config;
