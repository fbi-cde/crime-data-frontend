var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: './src/entry.js',
  output: {
    path: __dirname,
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
