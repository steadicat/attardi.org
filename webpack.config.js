/* eslint no-var: 0, node: true */
var webpack = require('webpack');
var path = require('path');

var DEBUG = process.env.NODE_ENV != 'production';
var PORT = 8081;

module.exports = {
  entry: [
    DEBUG && 'webpack-hot-middleware/client?path=http://localhost:' + PORT + '/__webpack_hmr',
    './js/main',
  ].filter(function(x) { return !!x }),
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/,
      }
    ],
  },
  output: {
    library: 'Attardi',
    filename: 'main.js',
    path: path.join(__dirname, 'build'),
    publicPath: DEBUG ? 'http://localhost:' + PORT + '/' : '/',
    pathinfo: DEBUG,
  },
  devtool: DEBUG && ['eval', 'inline-source-map'],
  plugins: [
    DEBUG && new webpack.HotModuleReplacementPlugin(),
    DEBUG && new webpack.NoErrorsPlugin(),
    !DEBUG && new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"'}),
    !DEBUG && new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      comments: false,
      compress: {warnings: false},
    }),
  ].filter(function(x) { return !!x }),
};
