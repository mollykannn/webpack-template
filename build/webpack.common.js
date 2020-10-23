const path = require("path");
const glob = require("glob");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const PurgecssPlugin = require("purgecss-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const commonConfig = {
  entry: {
    main: "./src/js/index.js",
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "js/[name].js",
  },
  module: {
    rules: [
      {
        test: /\.(html)$/,
        use: {
          loader: "html-loader",
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.(svg)$/i,
        use: {
          loader: "file-loader",
          options: {
            name: "images/[name].[ext]",
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/i,
        use: {
          loader: "url-loader",
          options: {
            name: "images/[name].[ext]",
            limit: 10000,
          },
        },
      },
    ],
  },
  plugins: [
    new StylelintPlugin({
      configFile: "stylelint.config.js",
      fix: true,
    }),
    new CleanWebpackPlugin({}),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "src/index.html",
      filename: "index.html",
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true,
      },
    }),
    new CopyPlugin({
      patterns: [
        { from: "", to: "" },
      ],
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.resolve(__dirname, "../src")}/**/*`, {
        nodir: true,
      }),
    }),
  ],
};
module.exports = commonConfig;
