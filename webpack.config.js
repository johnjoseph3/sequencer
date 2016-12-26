const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const exec = require('child_process').exec;

module.exports = {
	entry: {
		app: ['./client/app.js'],
		vendor: ['angular']
	},
	output: {
		path: "dist",
		filename: 'app.bundle.js'
	},
	module: {
		preLoaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader'}],
		loaders: [
			{test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader")},
			{test: /\.less$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")},
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015'},
			{test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/, loader: "file"}
		]
	},
	devServer: { inline: true },
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.js', '.es6']
	},
	plugins : [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js"),
		new ExtractTextPlugin("[name].css"),
		new CopyWebpackPlugin([{ from: 'assets/sounds'}, { from: 'client/index.html'}])
	]
}
