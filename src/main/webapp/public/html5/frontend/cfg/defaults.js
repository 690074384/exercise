'use strict';
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8888;
function getDefaultModules() {
  return {
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }
      ],
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style-loader", "css-loader",  { publicPath: './'}) 
      },
      { 
          test: /\.less$/, 
          loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader",  { publicPath: './'}) 
      },
      {
        test: /\.html$/,
        loader: 'mustache?noShortcut'
      },
      { test: /\.((woff2?|svg)(\?v=[0-9]\.[0-9]\.[0-9]))|(woff2?|svg|jpe?g|png|gif|ico)$/, loader: 'url?limit=10000' },
{ test: /\.((ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9]))|(ttf|eot)$/, loader: 'file' }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [];
  },
  vendor: ['backbone']
};