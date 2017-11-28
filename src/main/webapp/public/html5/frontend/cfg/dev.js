'use strict';

let path = require('path');
let webpack = require('webpack');
let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

let config = Object.assign({}, baseConfig, {
  entry: {
    index:[
      'webpack-dev-server/client?http://localhost:' + defaultSettings.port,
      'webpack/hot/only-dev-server',
      './src/index'
    ],
    
    vendor: defaultSettings.vendor
  },
  cache: true,
  devtool: 'eval-source-map',
  plugins: [
   
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /^\.\/zh\-cn$/),
    // //生成vendor chunk，抽取第三方模块单独打包成独立的chunk
    // new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.[hash].js'),
    // //抽取webpack loader公共部分的代码到manifest.js中，避免每次打包时hash发生变化
    // new webpack.optimize.CommonsChunkPlugin({
    //     names: ['vendor', 'manifest']
    // }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendor.js',
        chunks: ['index', 'vendor']
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'manifest',
        filename: 'manifest.js', //仅包含webpack运行时环境和映射表
        chunks: ['vendor']
    }),
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("[name].css"),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      output: {comments: false}
    }),
    new webpack.NoErrorsPlugin(),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    })
  ],
  module: defaultSettings.getDefaultModules()
});


// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js)$/,
  loader: 'es3ify-loader'
});

config.module.loaders.push({
  test: /\.(js)$/,
  loader: 'babel-loader',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});


module.exports = config;
