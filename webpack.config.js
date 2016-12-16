const path = require('path')

const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
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
    new ExtractTextPlugin('app.css')
  ]
}
