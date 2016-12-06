module.exports = {
	entry: ['./client/app.js'],
	output: {
		path: 'public',
		filename: '/bundle.js'
	},
	module: {
		preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'jshint-loader'
			}
		],
		loaders: [
			{ test: /\.css$/, loader: "style-loader!css-loader" },
			{
				test: /\.es6$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015']
				}
			}
		]
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['', '.js', '.es6']
	},
}
