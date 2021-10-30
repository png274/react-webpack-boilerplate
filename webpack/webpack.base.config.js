const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const plugins = [
  new HtmlWebPackPlugin({
    inject: true,
    template: path.join(process.cwd(), "public/index.html"),
  }),
];

const resolve = {
  modules: [__dirname, "src", "node_modules"],
  extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
};

const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,

    use: [
      // Used to convert jsx file into browser readable format
      // with the help of presets declared in .babelrc file
      {
        loader: "babel-loader",
        options: {
          presets: [
            "@babel/preset-env",
            "@babel/preset-react",
            "@babel/preset-typescript",
          ],
        },
      },
    ],
  },
  {
    test: /\.png|svg|jpg|gif$/,
    use: [
      // Will be used to load files
      "file-loader",
    ],
  },
  {
    test: /\.tsx?$/,
    use: "ts-loader",
    exclude: /node_modules/,
  },
];

module.exports = (options) => ({
  mode: options.mode,
  entry: [path.join(process.cwd(), "src/index.tsx")],
  output: options.output,
  devServer: options.devServer,
  resolve: { ...resolve, ...options.resolve },
  module: {
    rules: options.module.rules.concat(rules),
  },
  plugins: options.plugins.concat(plugins),
});
