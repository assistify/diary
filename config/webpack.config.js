const path = require('path');
const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

const devMode = process.env.NODE_ENV !== 'production';

const paths = require('./paths');


// TODO: Parse env, see https://github.com/zupzup/multi-stage-docker-react/blob/master/config/env.js
const envKeys = [];

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', 'whatwg-fetch', './app/client/index.jsx'],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~_variables.sass': paths.sassVariables,
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /.(js|jsx)$/,
      use: 'babel-loader'
    },
    // CSS / SASS
    {
      test: /\.(sa|sc|c)ss$/,
      use: [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        // 'postcss-loader',
        'sass-loader',
      ],
    },
    // SVG
    {
      test: /\.svg$/,
      issuer: /\.s?css$/,
      use: [
        {
          loader: 'babel-loader'
        },
        {
          loader: 'svg-url-loader',
          options: {
            jsx: true // true outputs JSX tags
          }
        }
      ]
    }
    ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/client/index.html'
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin(envKeys)
  ],
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'eval-source-map'
};
