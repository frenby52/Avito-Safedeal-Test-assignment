const path = require(`path`);
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  mode: `development`,
  entry: [
    `./src/main.js`,
    `./src/scss/style.scss`],
  output: {
    path: path.join(__dirname, `public`),
    filename: `bundle.js`
  },
  devtool: `source-map`,
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: true,
    watchContentBase: true
  },
  module: {
    rules: [{
      test: /\.(sass|scss)$/,
      include: path.resolve(__dirname, 'src/scss'),
      use: ExtractTextPlugin.extract({
        use: [{
          loader: "css-loader",
          options: {
            sourceMap: true,
            url: false
          }
        },
        {
          loader: 'sass-loader',
          options: {
            sourceMap: true
          }
        }
        ]
      })
    },
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/style.bundle.css',
      allChunks: true,
    }),
  ]
};
