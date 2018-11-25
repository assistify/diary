const path = require('path');
const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin
const paths = require('./paths');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

const devMode = process.env.NODE_ENV !== 'production';
// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// Some apps do not use client-side routing with pushState.
// For these, "homepage" can be set to "." to enable relative asset paths.
const shouldUseRelativeAssetPaths = publicPath === './';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill', 'whatwg-fetch', './src/client/index.jsx'],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '~_variables.sass': path.resolve(__dirname, '../src/client/styles/variables.scss'),
    },
  },
  output: {
    // The build folder.
    path: paths.appBuild,
    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: 'static/js/[name].[chunkhash:8].js',
    chunkFilename: 'static/js/[name].[chunkhash:8].chunk.js',
    // We inferred the "public path" (such as / or /my-project) from homepage.
    publicPath: publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info =>
      path.relative(paths.appSrc, info.absoluteResourcePath),
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
      template: './src/client/index.html'
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
