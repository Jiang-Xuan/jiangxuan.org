const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

const config = require('./webpack.config.js')

const PORT = 10000
const HOSTS = '127.0.0.1'

Object.keys(config.entry).map(function (item) {
  config.entry[item].unshift(
    `webpack-dev-server/client?http://${HOSTS}:${PORT}`,
    'webpack/hot/dev-server'
  )
})

var compiler = webpack(config)

var server = new WebpackDevServer(compiler, {
  hot: true,
  inline: true,
  quiet: false,
  compress: false,
  historyApiFallback: true,
  stats: {
    assets: true,
    colors: true,
    version: false,
    hash: true,
    timings: true,
    chunks: false,
    chunkModules: true
  }
})

server.listen(PORT)

console.log(`Open http://${HOSTS}:${PORT}/index.html`)