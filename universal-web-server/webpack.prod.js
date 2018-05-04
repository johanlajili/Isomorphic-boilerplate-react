const path = require('path');

module.exports = {
	mode: 'production',
	entry: [
		'./app/client/index.js',
	],
	output: {
		path: path.join(__dirname, 'build/client/'),
		filename: 'bundle.js',
	},
	module: {
		rules: [
			{
				test: /.js$/,
				loader: 'babel-loader',
				include: path.join(__dirname, 'app'),
				exclude: /node_module/,
				query: {
					presets: ['es2015', 'react'],
				},
			},
		],
	},
};
