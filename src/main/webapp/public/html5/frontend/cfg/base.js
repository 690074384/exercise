'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
let webpack = require('webpack');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
let additionalPaths = [];

module.exports = {
  additionalPaths: additionalPaths,
  port: defaultSettings.port,
  debug: true,
  devtool: 'eval',
  output: {
    path: path.join(__dirname, '/../dist/assets'),
    filename: '[name].js',
    publicPath: `.${defaultSettings.publicPath}`
  },
  devServer: {
    contentBase: './src/',
    historyApiFallback: true,
    hot: true,
    port: defaultSettings.port,
    publicPath: defaultSettings.publicPath,
    noInfo: false,
    proxy: {
    // websocket mock
    // '/ws-web/*': {
    //   target: 'ws://localhost:3100',
    //   ws: true
    // },
    //连接测试环境打开这个
    // '/mr/*': {target: 'http://172.16.102.238:8081'}
    '/mr/*': {target: 'http://172.16.103.205:8080'}

    //连接静态mock数据打开这个

    // '/ehr-web/*': {
    //   target: 'http://localhost:' + defaultSettings.port,
    //   // pathRewrite onProxyReq两个方法是为了1.15.1使用
    //   // pathRewrite: function(path, req) {
    //   //   return path.replace(/^\/ehr-web/, '/testdata')
    //   // },
    //   // onProxyReq: function(proxyReq, req, res){
    //   //   if ( req.method == "POST" ) {
    //   //     proxyReq.method = 'GET';
    //   //   }
    //   // },
    //   rewrite: function(req) {
    //     req.url = req.url.replace(/^\/ehr-web/, '/testdata');
    //     req.method = "GET";
    //   },
    //   bypass: function(req, res, proxyOptions) {
    //     var noProxy = [
    //       // '/api/course/courseList.action'
    //       ];
    //     if (noProxy.indexOf(req.url) !== -1) {
    //       console.log('Skipping proxy for browser request.');
    //       return req.url;
    //     }
    //    }
    //   }
    }
  },
  resolve: {
    extensions: ['', '.js'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
    }
  },
  module: {}
};
