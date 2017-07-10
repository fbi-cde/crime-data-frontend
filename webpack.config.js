/* eslint-disable comma-dangle, no-param-reassign, no-var, quote-props  */
const fs = require('fs')
const path = require('path')

const autoprefixer = require('autoprefixer')
const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const webpack = require('webpack')

const env = process.env.NODE_ENV || 'development'

const clientConfig = {
  entry: './src/entry.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!autotrack|dom-utils)/,
        loader: 'babel-loader',
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
                plugins: [autoprefixer('last 2 versions', '> 5%')],
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                includePaths: ['node_modules'],
              },
            },
          ],
        }),
      },
      {
        test: /\.ya*ml$/,
        use: ['json-loader', 'yaml-loader'],
      },
    ],
  },
  plugins: [
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new ExtractTextPlugin('app.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env),
      },
    }),
  ],
}

const serverConfig = {
  cache: false,
  entry: './src/server.js',
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'server.js',
  },
  target: 'node',
  node: {
    __dirname: false,
  },
  externals: fs
    .readdirSync('node_modules')
    .filter(x => ['.bin'].indexOf(x) === -1)
    .reduce((nodeModules, mod) => {
      nodeModules[mod] = `commonjs ${mod}`
      return nodeModules
    }),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules\/(?!autotrack|dom-utils)/,
        loader: 'babel-loader',
      },
      {
        test: /\.ya*ml$/,
        use: ['json-loader', 'yaml-loader'],
      },
    ],
  },
  plugins: [new webpack.IgnorePlugin(/\.(css|less)$/)],
}

if (env === 'production') {
  clientConfig.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = [serverConfig, clientConfig]
