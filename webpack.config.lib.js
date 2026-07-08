const path = require("path");
const webpack = require("webpack");
const { genCustomConsole } = require("mazey");
const { userscriptHeaders } = require("./config/userscript");

const webpackCon = genCustomConsole("[webpack]");
const ENTRY = process.env.ENTRY;
webpackCon.log(`ENTRY ${ENTRY}`);
const ENTRY_FILE = `./src/${ENTRY}.js`;
webpackCon.log(`ENTRY_PATH ${ENTRY_FILE}`);

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
    filename: userscriptHeaders[ENTRY] ? "[name].user.js" : "[name].js",
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

if (userscriptHeaders[ENTRY]) {
  config.optimization = {
    minimize: false,
  };
}

module.exports = config;
