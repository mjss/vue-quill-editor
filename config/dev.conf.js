
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./base.conf')

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = merge(baseConfig, {
  mode: 'development',
  entry: {
    'main': './examples/main.js'
  },
  externals: {
    quill: {
        root: 'Quill',
        commonjs: 'quill',
        commonjs2: 'quill',
        amd: 'quill'
    },
    'object-assign': 'object-assign'
  },
  output: {
    path: path.resolve(__dirname, '../dist/examples'),
    publicPath: '/',
    filename: '[name].[hash:7]js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'quill-editor',
      filename: 'index.html',
      template: 'examples/index.html',
      inject: true
    }),
  ],
  devtool: '#source-map',
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    modules: [
      resolve('src'),
      resolve('node_modules')
    ],
    alias: {
      'quill': 'quill/dist/quill.js',
    }
  }
})
