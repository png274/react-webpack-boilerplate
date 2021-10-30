const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const port = process.env.PORT || 3000;

const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: "styles/styles.[hash].css",
  }),
];

const rules = [
  {
    test: /\.s[ac]ss$/i, // sass/scss
    use: [
      // Extract css to a separate file rather than inlining it
      MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      "css-loader",
      // Compiles Sass to CSS
      "sass-loader",
    ],
  },
];

module.exports = require("./webpack.base.config")({
  mode: "production",
  output: {
    path: path.resolve(path.join(process.cwd(), "dist")),
    filename: "bundle.[fullhash].js",
    publicPath: "/",
  },
  resolve: {},
  devServer: {
    port: port,
    static: {
      directory: path.resolve(__dirname, "./dist"),
    },
  },
  module: {
    rules,
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
        vendor: {
          chunks: "initial",
          test: "vendor",
          name: "vendor",
          enforce: true,
        },
      },
    },
  },
  plugins,
});
