const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
var FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

// Is the current build a development build
const IS_DEV = (process.env.NODE_ENV === 'dev');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src/js/');
const dirImgs = path.join(__dirname, 'src/images');
const dirStyles = path.join(__dirname, 'src/css');

const appHtmlTitle = 'Webpack Boilerplate';

/**
 * Webpack Configuration
 */
module.exports = {
  entry: {
    // vendor: [
    //     'lodash'
    // ],
    main: path.join(dirApp, 'index')
  },
  resolve: {
    modules: [
      dirNode,
      dirApp,
      dirImgs,
      dirStyles
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      IS_DEV
    }),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.pug'),
      title: appHtmlTitle
    }),

    new FriendlyErrorsWebpackPlugin()
  ],
  module: {
    rules: [
      // BABEL
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['eslint-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          compact: true
        }
      },

      // STYLES
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: IS_DEV
            }
          }
        ]
      },

      // CSS / SASS
      {
        test: /\.scss/,
        use: IS_DEV ?
          [
            MiniCssExtractPlugin.loader,
            // 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                autoprefixer: {
                  browsers: ['last 2 versions']
                },
                plugins: () => [
                  autoprefixer
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV,
                includePaths: [dirStyles]
              }
            }
          ]
          : [
            MiniCssExtractPlugin.loader,
            // 'style-loader',
            {
              loader: 'css-loader',
              options: {
                sourceMap: IS_DEV
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: IS_DEV,
                autoprefixer: {
                  browsers: ['last 2 versions']
                },
                plugins: () => [
                  autoprefixer
                ]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: IS_DEV,
                includePaths: [dirStyles]
              }
            }
          ]
      },

      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true
            }
          }
        ]
      },

      {
        test: /.pug$/,
        use: {
          loader: 'pug-loader',
          query: {} // Can be empty
        }
      },

      // IMAGES
      //   {
      //     test: /\.(png|jpg|gif)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //     use: [
      //       {
      //         loader: 'url-loader',
      //         options: {
      //           limit: 10000,
      //           name: 'images/[name].[ext]'
      //         }
      //       }
      //     ]
      //   },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        exclude: /node_modules/,
        loaders: ['file-loader?context=src/images/&name=images/[path][name].[ext]', { // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true
            },
            gifsicle: {
              interlaced: false
            },
            optipng: {
              optimizationLevel: 4
            },
            pngquant: {
              quality: '75-90',
              speed: 3
            },
            svgo: {
              plugins: [
                {
                  removeViewBox: false
                },
                {
                  removeEmptyAttrs: false
                }
              ]
            },
            // Specifying webp here will create a WEBP version of your JPG/PNG images
            webp: {
              quality: 75
            }
          }
        }],
        include: __dirname
      },

      // FONTS
      {
        test: /\.(woff|woff2|otf|ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'fonts/[name].[ext]'
            }
          }
        ]
      },

      // Others
      {
        test: /\.(mp4|ogg|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/[name].[ext]'
            }
          }
        ]
      }
    ]
  }
};
