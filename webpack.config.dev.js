const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

  devtool: 'eval',

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    open: true,
    port: 8080,
    hot: true,
    watchOptions: {
      poll: 1000
    },
    stats: {
        errors: true,
        warnings: true
    }
  }

});
