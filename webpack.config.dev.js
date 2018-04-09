const path = require('path');
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

module.exports = merge(webpackConfig, {
  devtool: 'eval',

  output: {
    pathinfo: true,
    publicPath: '/',
    filename: 'js/[name].js',
    path: PATHS.build
  },
  devServer: {
    contentBase: path.resolve(__dirname, './src'),
    open: true,
    // port: 8080,
    quiet: true,
    // hot: true,
    watchOptions: {
      poll: 1000
    },
    stats: {
      errors: true,
      warnings: true
    }
  }
});
