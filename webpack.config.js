/* eslint-disable comma-dangle, no-var, quote-props  */

var path = require('path')

var autoprefixer = require('autoprefixer')
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
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/i,
        loader: ExtractTextPlugin.extract(['css', 'postcss', 'sass'])
      },
    ]
  },
  sassLoader: {
    outputStyle: 'compressed',
    includePaths: ['node_modules']
  },
  postcss: [
    autoprefixer({ browsers: ['last 2 versions', '> 2%'] })
  ],
  plugins: [
    new ExtractTextPlugin('app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env)
      }
    })
  ]
}

if (env === 'production') {
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
