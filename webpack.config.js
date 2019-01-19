module.exports = {
	entry: './src/juxtapose-block.js',
	output: {
		path: __dirname,
		filename: 'juxtapose-block.build.js',
	},
	module: {
		loaders: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
			},
		],
	},
};
