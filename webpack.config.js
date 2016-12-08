const path = require('path')
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
        loader: ExtractTextPlugin.extract(['css', 'sass'])
      },
    ]
  },
  sassLoader: {
    outputStyle: 'compressed',
    includePaths: ['node_modules']
  },
  plugins: [
    new ExtractTextPlugin('app.css')
  ]
}
