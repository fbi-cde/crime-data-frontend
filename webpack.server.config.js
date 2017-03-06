var fs = require('fs');
var path = require('path');

var webpack = require('webpack');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) { return ['.bin'].indexOf(x) === -1; })
  .forEach(function(mod) { nodeModules[mod] = 'commonjs ' + mod; });

var config = {
  cache: false,
  entry: './server.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js'
  },
  target: 'node',
  node: {
    __dirname: false
  },
  externals: nodeModules,
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.ya*ml$/,
        loaders: ['json', 'yaml']
      }
    ]
  },
  plugins: [
    new webpack.IgnorePlugin(/\.(css|less)$/),
    new webpack.BannerPlugin('require("source-map-support").install();',
                             { raw: true, entryOnly: false })
  ]
}

module.exports = config
