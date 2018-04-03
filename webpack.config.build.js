const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const webpackConfig = require('./webpack.config');

const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
};

module.exports = merge(webpackConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].[chunkhash].js'
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new MiniCssExtractPlugin({
      filename: './css/[name].css',
      chunkFilename: '[id].css'
    }),
    new CopyWebpackPlugin([{
      from: './src/images',
      to: './images'
    }]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
  ],
  optimization: {
    namedModules: true, // NamedModulesPlugin()
    splitChunks: { // CommonsChunkPlugin()
      name: 'vendor',
      minChunks: 2
    },
    noEmitOnErrors: true, // NoEmitOnErrorsPlugin
    concatenateModules: true // ModuleConcatenationPlugin
  }
});
