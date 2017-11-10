const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
  // const HtmlWebpackHarddisPlugin = require('html-webpack-harddisk-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const AppConfig = require('./app.config.js')
const debug = require('debug')('webpack.config.common')

module.exports = {
  output: {
    path: path.resolve(__dirname, '../dist'),
    // publicPath:
    filename: '[name]/[name].js'
  },
  module: {
    rules: [{
        test: /\.template$/,
        exclude: /node_modules/,
        use: {
          loader: 'handlebars-loader'
        }
      }, {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: {
            presets: ['env']
          }
        }
      }, {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }, {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      }, {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[hash:8][name].[ext]',
            outputPath: path.resolve(__dirname, '../dist/contracts/')
          }
        }
      }, {
        test: /\.(cvs|tsv)$/,
        use: ['cvs-loader']
      }, {
        test: /\.xml$/,
        use: ['xml-loader']
      }, {
        test: require.resolve('tinymce/tinymce'),
        use: ['imports-loader?this=>window',
          'exports-loader?window.tinymce'
        ]
      }, {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[hash:8][name].[ext]',
            outputPath: path.resolve(__dirname, '../dist/contracts/')
              // useRelativePath: true,
              // publicPath: path.resolve(__dirname, '../dist/contracts/')
          }
        }]
      }, {
        test: /tinymce\/(themes|plugins)\//,
        use: ['imports-loader?this=>window']
      }
      /*, {
            test: require.resolve('tinymce/skins/lightgray/skin.min.css'),
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'less-loader']
            })
          }, {
            test: require.resolve('tinymce/skins/lightgray/content.min.css'),
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: ['css-loader', 'less-loader']
            })
          }*/
    ]
  },
  plugins: [
    new CleanWebpackPlugin([path.resolve(__dirname, '../dist')], {
      root: path.resolve(__dirname, '../')
    }),
    new webpack.ProvidePlugin({
      lodash: 'lodash',
      jquery: 'jquery',
      $: 'jquery',
      moment: 'moment',
      handlebars: 'handlebars'
    }),
    new ExtractTextPlugin({
      filename: "[name]/[chunkhash][name].css",
      allChunks: true
    })
  ],
  node: {
    fs: 'empty'
  }
};
