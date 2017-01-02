var fs = require('fs')
var webpack = require('webpack')
var version = require('./package.json').version
var smart_ui_version = require('./package.json').smart_ui_version

var HtmlWebpackPlugin = require('html-webpack-plugin')

var HtmlWebpackPlugin2 = require('./HtmlWebpackPlugin2')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// var dllConfig = require('./webpack.config.dll')
var path = require('path')
var customMDtoHTML = require('./customMDtoHTML')

var evnironment = process.env.NODE_ENV || 'dev'

var dev_environment = evnironment.indexOf('dev') !== -1

var daily_environment = evnironment.indexOf('daily') !== -1
var dist_environment = evnironment.indexOf('dist') !== -1

var rootPath = './src-react'
var distPath = './build'

var daily_cdn_domain = 'daily.yuantutech.com'
var dist_cdn_domain = 's.yuantutech.com'

var cnd_domain = daily_environment || dev_environment ? daily_environment : dist_cdn_domain

//cdn
var daily_publicPath = "//daily.yuantutech.com/yuantu/h5-cli/"+version+"/";
var dist_publicPath = "//s.yuantutech.com/yuantu/h5-cli/"+version+"/";

// 本地开发环境通常不需要配置
var dev_publicPath = null


var publicPath = daily_environment ? daily_publicPath : (dist_environment ? dist_publicPath : dev_publicPath)

var extractLess = new ExtractTextPlugin('all.css')

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
    publicPath: publicPath,
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
        loader: extractLess.extract(['css', 'less', 'postcss'])
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

var addAssetTags = [
  {
    tagName: 'script',
    closeTag: true,
    attributes: {
      type: 'text/javascript',
      src: (function() {
        if(dev_environment) {
          return `//s.yuantutech.com/yuantu/h5-cli/1.4.29/vendor.js`
        }

        if(daily_environment) {
          return  `//s.yuantutech.com/yuantu/h5-cli/1.4.29/vendor.js`
        }

        if(dist_environment){
          return  `//s.yuantutech.com/yuantu/h5-cli/1.4.29/vendor.js`
        }
      })()
    }
  }
]

var addAfterTags = [
  {
    tagName: 'script',
    closeTag: true,
    attributes: {
      type: 'text/javascript',
      async:"async",
      src:"https://s.yuantutech.com/yuantu/spm/1.0.7/??spm.js,track.js"
    }
  }
]

HtmlWebpackPlugin2.prototype.injectAssetsIntoAssetTags = function(assetTags) {
  // assetTags.body = addAssetTags.slice(0).concat(assetTags.body)
  // assetTags.body = assetTags.body.concat(addAfterTags)
  return assetTags
};

//打包的时候把静态资源打包进去 
Object.keys(entry).map(function(key){
  if( fs.existsSync( path.resolve(rootPath, `${key}.html`) )){
    console.log(`ADD entry ${key}.html`);
    config.plugins.push(
      new HtmlWebpackPlugin2({
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
          },
          //HtmlWebpackPlugin2 实现了变量插入
          variable:{
            cnd_domain:cnd_domain,
            smart_ui_version:smart_ui_version
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
  if(/\.md$/.test(item)) {
    mdEntry[item.replace('.md', '')] = `${mdPath}/${item}`
  }
})
Object.keys(mdEntry).map(function(item) {
  config.plugins.push(
    new customMDtoHTML({
      MD: `./md-article/${item}.md`,
      template: path.resolve(mdPath, 'template.html'),
      fileoutput: './md/' + item + '.html'
    })
  )
})

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









