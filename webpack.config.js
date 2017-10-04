const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const extractTextPlugin = require('extract-text-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const path = require('path');
const DEBUG = process.env.NODE_ENV !== 'production'; 

const config = {
	devtool: "source-map",
	devServer: {
		historyApiFallback: true,
		inline: true,
		open: true,
		port: 3000
	},
	entry: {
		"index": __dirname + "/src/entry/index.js",
		"vendor": ['vue', 'vue-router', 'jquery', 'ztree']
	},
	output: {
		path: DEBUG ? path.resolve(__dirname, '.resources') : path.resolve(__dirname, './dist/resources'),
		filename: "[name].js"
	},
	resolve: {
		extensions: ['.vue', '.js', '.css', '.scss'],
		alias: {
			"@": path.resolve(__dirname, './src'),
			"components": path.resolve(__dirname, './src/components'),
			"vue": "vue/dist/vue.js",
			"vue-router": "vue-router/dist/vue-router",
		}
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					{
						loader: "style-loader"
					},{
						loader: "css-loader"
					},{
						loader: "postcss-loader"
					}
				]
			},
			{
				test: /(\.jsx|\.js)$/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [ 'es2015', 'react' ]
					}
				},
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				use: {
					loader: "vue-loader"
				}
			},
			{
				test: /\.(png|jpg|gif|eot|ttf|woff|woff2|svg|svgz)$/,
				use: {
					loader: "url-loader"
				}
			}
		]
	},
	plugins: [
		new webpack.BannerPlugin('Author: Hikvision'),
		new htmlWebpackPlugin({template: __dirname + '/src/entry/index.tmpl.html'}),
		new webpack.optimize.CommonsChunkPlugin({
			names:['vendor']
		}),
		new extractTextPlugin('style.css'),
		new cleanWebpackPlugin([]),
		new webpack.ProvidePlugin({$: 'jquery', 'jQuery': 'jquery', 'window.jQuery': 'jquery'})
	]
}

module.exports = config;

