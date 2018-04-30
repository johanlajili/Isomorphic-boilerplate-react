const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: [
    'react-dev-utils/webpackHotDevClient',
    './app/client/index.js',
  ],
  output: {
    path: path.join(__dirname, 'build/client/'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_module/,
        query: {
          presets: ['es2015', 'react'],
        },
      },
    ],
  },
};
