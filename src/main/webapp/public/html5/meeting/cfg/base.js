'use strict';
let path = require('path');
let defaultSettings = require('./defaults');
let webpack = require('webpack');
const pxtorem = require('postcss-pxtorem');

// Additional npm or bower modules to include in builds
// Add all foreign plugins you may need into this array
// @example:
// let npmBase = path.join(__dirname, '../node_modules');
// let additionalPaths = [ path.join(npmBase, 'react-bootstrap') ];
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
    '/mr/*': {
      target: 'http://localhost:' + defaultSettings.port,
      pathRewrite: function(path, req) {
          return path.replace(/^\/mr/, '/testdata')
      },
      onProxyReq: function(proxyReq, req, res) {
          proxyReq.method = 'GET';
          proxyReq.setHeader('Access-Control-Allow-Origin', true);
      },
      bypass: function(req, res, proxyOptions) {
        var noProxy = [
          // '/api/course/courseList.action'
          ];
        if (noProxy.indexOf(req.url) !== -1) {
          console.log('Skipping proxy for browser request.');
          return req.url;
        }
       }
      }
      // '/mr/*': {
      //   target: 'http://172.16.103.111:8080/'
      //   // target: 'http://172.16.102.238:8080/' /*童博*/
      // }
    }
  },
  resolve: {
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    extensions: ['', '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/` + process.env.REACT_WEBPACK_ENV
    }
  },
  module: {},
  postcss: [
    pxtorem({
      rootValue: 75,
      propWhiteList: [],
      selectorBlackList: [/^html$/, /^\.ant-/, /^\.github-/, /^\.gh-/],
    })
  ]
};
