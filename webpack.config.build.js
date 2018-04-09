// const glob = require('glob');
const path = require('path');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const webpackConfig = require('./webpack.config');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
// const PurifyCSSPlugin = require('purifycss-webpack');

module.exports = merge(webpackConfig, {
  devtool: 'source-map',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].[chunkhash].js'
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    // new FaviconsWebpackPlugin({
    //   // Your source logo
    //   logo: './src/images/logo.png',
    //   // The prefix for all image files (might be a folder or a name)
    //   prefix: 'icons/',
    //   // Emit all stats of the generated icons
    //   emitStats: false,
    //   // The name of the json containing all favicon information
    //   statsFilename: 'iconstats-[hash].json',
    //   // Generate a cache file with control hashes and
    //   // don't rebuild the favicons until those hashes change
    //   persistentCache: true,
    //   // Inject the html into the html-webpack-plugin
    //   inject: true,
    //   // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
    //   background: '#fff',
    //   // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
    //   title: 'Webpack App',

    //   // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false
    //   }
    // }),
    new CopyWebpackPlugin([{
      from: './src/img',
      to: './img'
    }]),
    new ImageminPlugin({ test: /\.(jpe?g|png|gif|svg)$/i })
    // new PurifyCSSPlugin({
    //   // Give paths to parse for rules. These should be absolute!
    //   paths: glob.sync(path.join(__dirname, 'src/**/*.pug'))
    // })
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
