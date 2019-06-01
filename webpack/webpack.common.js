const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const dotenv = require('dotenv')
const nodeExternals = require('webpack-node-externals')

module.exports = env => {
	const result = dotenv.config({ path: __dirname + '/../.env' })
	let envKeys
	if (!result.error) {
		const env = result.parsed
		envKeys = Object.keys(env).reduce((prev, next) => {
			prev[`process.env.${next}`] = JSON.stringify(env[next])
			return prev
		}, {})
		console.log('Chargement du fichier .env')
	}

	let plugins = [
		new CleanWebpackPlugin(),
	]
	if(envKeys){
		plugins.push(new webpack.DefinePlugin(envKeys))
	}

	return {
		target: 'node',
		externals: [nodeExternals()],
		entry: {
			index: './src/index.js'
		},
		output: {
			path: path.resolve(__dirname, '../dist'),
			filename: '[name].js'
		},
		module: {
			rules: [{
					test: /\.js$/,
					include: path.resolve(__dirname, '../src'),
					use: ['babel-loader']
                },
				{
					test: /\.gql$/,
					include: path.resolve(__dirname, '../src'),
					use: ['graphql-tag/loader']
                }
			]
		},
		plugins,
		resolve: {
			symlinks: false
		},
		node: {
			__dirname: false
		}
	}
}