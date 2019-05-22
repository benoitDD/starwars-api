const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')

module.exports = env => {
	return merge(common(env), {
		mode: 'development',
		devtool: 'inline-source-map',
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('development')
			})
		]
	})
}