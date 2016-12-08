var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		app: ['./client/app.js'],
		vendor: ['angular']
	},
	output: {
		path: "public",
		filename: 'app.bundle.js'
	},
	module: {
		preLoaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader'}],
		loaders: [
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015' },
		]
	},
	devServer: { inline: true },
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.js', '.es6']
	},
	plugins : [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
		new ExtractTextPlugin("[name].css")
	]
}
