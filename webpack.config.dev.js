const path = require("node:path");
const webpack = require("webpack");
const { userscriptHeaders } = require("./config/userscript");

const linkReloadClient = `${require.resolve("webpack-dev-server/client/index.js")}?protocol=ws&hostname=127.0.0.1&port=4131&pathname=/ws&hot=false&live-reload=true`;

const entry = {
  addstyle: path.resolve(__dirname, "src/addstyle.js"),
  cdn: path.resolve(__dirname, "src/pages/cdn/index.js"),
  confluence: path.resolve(__dirname, "src/confluence.js"),
  index: path.resolve(__dirname, "src/pages/index/index.js"),
  link: [linkReloadClient, path.resolve(__dirname, "src/pages/link/index.js")],
  list: path.resolve(__dirname, "src/list.js"),
  obfuscator: path.resolve(__dirname, "src/pages/obfuscator/index.js"),
  webhook: path.resolve(__dirname, "src/webhook.js"),
  wordpress: path.resolve(__dirname, "src/wordpress.js"),
};

module.exports = {
  mode: "development",
  entry,
  output: {
    filename: ({ chunk }) => chunk.name === "webhook" ? "webhook.user.js" : `${chunk.name}.js`,
    path: path.resolve(__dirname, "lib"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", {
          loader: "sass-loader",
          options: {
            implementation: require("sass"),
          },
        }],
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: userscriptHeaders.webhook,
      raw: true,
      entryOnly: true,
      include: /webhook\.user\.js$/,
    }),
  ],
  devServer: {
    host: "127.0.0.1",
    port: 4131,
    static: false,
    compress: true,
    hot: false,
    liveReload: true,
    client: false,
    devMiddleware: {
      publicPath: "/",
    },
  },
};
