const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = env => ({
  entry: './src/index.js',
  mode: env === 'development' ? 'development' : 'production',
  externals: {
    jQuery: 'jquery',
    $: 'jquery'
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'public')
  },
  module: {
    rules: [
      // CSS
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      // Images - using Webpack 5 asset modules instead of url-loader
      {
        test: /\.(png|jpg|gif|svg)$/i,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 8192
          }
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    // copy static assets as they are required from external sources
    new CopyWebpackPlugin({
      patterns: [{ from: 'src/assets', to: '' }]
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  devtool: env === 'development' && 'source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    compress: true,
    port: 8080,
    hot: true
  }
})
