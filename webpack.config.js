const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

let babel = {
  entry: {
  	index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: '[name].bundle.js',
    chunkFilename: '[name]-[chunkhash]-chunk.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        options: {
          presets: ['flow','react','es2015'],
          plugins: ["dynamic-import-webpack"]
        },
        exclude: [
          path.resolve(__dirname, 'node_modules')
        ]
      },
      {
        test: /\.html$/,
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: true
          }
        }],
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        // Limiting the size of the woff fonts breaks font-awesome ONLY for the extract text plugin
        // loader: "url?limit=10000"
        use: "url-loader"
      },
      {
        test: /\.(ttf|eot|svg|jpg|png|gif)(\?[\s\S]+)?$/,
        use: 'file-loader'
      },
      {
        test: /font-awesome\.config\.js/,
        use: [
          { loader: "style-loader" },
          { loader: "font-awesome-loader" }
        ]
      }
    ]
  },
  devServer: {
    contentBase: [path.join(__dirname, 'public')],
    compress: true,
    port: 3000,
    historyApiFallback: {
      rewrites: [
        { from: /^\/$/, to: '/index.html'},
        { from: /^\/preview$/, to: '/preview.html'},
      ]
    }
  },
  plugins: [
  	new webpack.ProvidePlugin({
  		Promise: 'bluebird',
  		root: 'window-or-global',
  		propTypes: 'prop-types'
  	}),
  	new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 3001,
      openAnalyzer: true,
    })
  ]
}

let sass = require('./webpack/sass')

module.exports = merge(babel, sass)
