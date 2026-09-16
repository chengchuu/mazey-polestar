const fs = require("fs");
const path = require("path");
const webpack = require("webpack");
const { genCustomConsole } = require("mazey");
const { userscriptHeaders } = require("./config/userscript");

const webpackCon = genCustomConsole("[webpack]");
const ENTRY = String(process.env.ENTRY || "").trim();

if (!ENTRY) {
  throw new Error("Missing ENTRY environment variable. For example: ENTRY=webhook webpack --config webpack.config.lib.js");
}

if (!/^[A-Za-z0-9_-]+$/.test(ENTRY)) {
  throw new Error(`Invalid ENTRY "${ENTRY}". Use only letters, numbers, underscores, and hyphens.`);
}

webpackCon.log(`ENTRY ${ENTRY}`);
const ENTRY_FILE = `./src/${ENTRY}.js`;

if (!fs.existsSync(path.resolve(__dirname, ENTRY_FILE))) {
  throw new Error(`Unknown ENTRY "${ENTRY}": ${ENTRY_FILE} does not exist.`);
}

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
