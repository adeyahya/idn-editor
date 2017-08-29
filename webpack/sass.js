const autoprefixer = require('autoprefixer')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
	module: {
		rules: [
			{
				test: /\.scss?$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        })
			}
		]
	},
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.ProvidePlugin({
      Promise: 'bluebird'
    })
  ]
}
