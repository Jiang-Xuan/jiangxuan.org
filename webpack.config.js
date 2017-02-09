'use strict'

var fs = require('fs')
var webpack = require('webpack')
var version = require('./package.json').version
var smart_ui_version = require('./package.json').smart_ui_version

var HtmlWebpackPlugin = require('html-webpack-plugin')

var ExtractTextPlugin = require('extract-text-webpack-plugin')
var path = require('path')
var customMDtoHTML = require('./customMDtoHTML')
var customMDtoHTMLUseCmarked = require('./customMDtoHTMLUseCmarked')

var evnironment = process.env.NODE_ENV || 'dev'
// 设置markdown的解析器  现在处于测试个人的markdown编译器期间
var markdownCompiler = process.env.markdownCompiler || 'marked'

var dev_environment = evnironment.indexOf('dev') !== -1

var dist_environment = evnironment.indexOf('dist') !== -1

var rootPath = './src-react'
var distPath = './build'

// 本地开发环境通常不需要配置
var dev_publicPath = null

var extractLess = new ExtractTextPlugin('all.css')

// use cmarked article 
let useCmarkedArticle = require('./package.json').use_cmarked_article
let colors = require('colors')
// 

// 读取js文件作为入口
var entry = {}
fs.readdirSync(rootPath).map(function(item) {
	if(/\.js$/.test(item)) {
		entry[item.replace('.js', '')] = [rootPath + '/' + item]
	}
})

// ---

var config = {
	entry: {
		app: [`./${rootPath}/app.js`]
	},
	output: {
		path: path.resolve(__dirname, distPath),
		publicPath: "./",
		filename: '[name].bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: path.resolve(__dirname, 'node_modules/'),
				loader: 'babel',
				query: {
					presets: ['react', 'es2015', 'stage-1'],
					plugins: ['transform-runtime'],
					cacheDirectory: true
				}
			},
			{
				test: /\.ttf$/,
				loader: 'file-loader'
			},
			{
				test: /\.(less|css)$/,
				loader: extractLess.extract(['css', 'less'])
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/i,
				loader: 'url-loader?limit=8192'
			}
		]
	},
	plugins: [
		extractLess
	]
}

//打包的时候把静态资源打包进去 
Object.keys(entry).map(function(key){
	if( fs.existsSync( path.resolve(rootPath, `${key}.html`) )){
		console.log(`ADD entry ${key}.html`);
		config.plugins.push(
			new HtmlWebpackPlugin({
					filename:path.resolve(distPath, `${key}.html`),
					template:path.resolve(rootPath, `${key}.html`),
					inject:true,
					hash:false,
					cache:true,
					//要插入什么内容
					chunks:['app'],
					minify:{
						removeComments:false,
						collapseWhitespace:false
					}
			})
		)
	}
});

// -----------------markdown-------------
// 设置md文档路径
var mdPath = path.resolve(__dirname, 'md-article')
var mdOutputPath = path.resolve(__dirname, 'build/md')
// 读取markdown入口文件
var mdEntry = {}
fs.readdirSync(mdPath).map(function(item) {
	if(/[^(index)]\.md$/.test(item)) {
		mdEntry[item.replace('.md', '')] = `${mdPath}/${item}`
	}
})
Object.keys(mdEntry).map(function(item) {
	if(~useCmarkedArticle.indexOf(item)) {
		console.log(item + ': 该文件使用cmarked个人编译器'.green)
		config.plugins.push(
			new customMDtoHTMLUseCmarked({
				MD: `./md-article/${item}.md`,
				template: path.resolve(mdPath, 'template.html'),
				fileoutput: './md/' + item + '.html'
			})
		)
	} else {
		console.log(item + ': 该文件使用marked第三方编译器'.red)
		config.plugins.push(
			new customMDtoHTML({
				MD: `./md-article/${item}.md`,
				template: path.resolve(mdPath, 'template.html'),
				fileoutput: './md/' + item + '.html'
			})
		)
	}
})


// 单独生成index索引文件
config.plugins.push(
	new customMDtoHTML({
		MD: './md-article/index.md',
		template: path.resolve(mdPath, 'template.html'),
		fileoutput: './home.html'
	})
)
// -----------------markdown end-----------
//线上打包需要压缩代码
if(dist_environment){
	config.plugins.unshift(
			new webpack.optimize.UglifyJsPlugin({
					compress: {
							warnings: false
					}
			})
		)
}

/**
	热加载需要的两个插件
*/
if(dev_environment){
	config.plugins.push(new webpack.HotModuleReplacementPlugin())
	config.plugins.push(new webpack.NoErrorsPlugin({"process.env.NODE_ENV":"development"}))
}   


module.exports = config;









