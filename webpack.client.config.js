/* eslint-disable comma-dangle, no-var, quote-props  */

var path = require('path')

var autoprefixer = require('autoprefixer')
var CompressionPlugin = require('compression-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var webpack = require('webpack')

var env = process.env.NODE_ENV || 'development'

var config = {
  entry: './src/entry.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!autotrack|dom-utils)/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/i,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: [autoprefixer('last 2 versions', '> 5%')]
              }
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                includePaths: ['node_modules']
              }
            }
          ]
        })
      },
      {
        test: /\.ya*ml$/,
        use: ['json-loader', 'yaml-loader']
      }
    ]
  },
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env)
      }
    })
  ]
}

if (env === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
