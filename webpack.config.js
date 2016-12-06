path = require('path');

module.exports = {
	entry: {
		app: ['./client/app.js'],
		vendors: ['angular']
	},
	output: {
		path: 'public',
		filename: '[name].js'
	},
	module: {
		preLoaders: [{test: /\.js$/, exclude: /node_modules/, loader: 'jshint-loader'}],
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{test: /\.js$/, exclude: /node_modules/, loader: 'babel?presets[]=es2015' },
			{loader: 'ngtemplate?relativeTo=' + (path.resolve(__dirname, './client')) + '/!html'}
		]
	},
	devServer: { inline: true },
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.js', '.es6']
	},
}
