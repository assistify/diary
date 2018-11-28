const path = require('path');
const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getClientEnvironment = require('./env');
const paths = require('./paths');

const devMode = process.env.NODE_ENV !== 'production';

// Webpack uses `publicPath` to determine where the app is being served from.
// It requires a trailing slash, or the file assets will get an incorrect path.
const publicPath = paths.servedPath;
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_URL%/xyz looks better than %PUBLIC_URL%xyz.
const publicUrl = publicPath.slice(0, -1);

// Get environment variables to inject into our app.
const env = getClientEnvironment(publicUrl);

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
    publicPath,
    // Point sourcemap entries to original disk location
    devtoolModuleFilenameTemplate: info => path.relative(paths.appSrc, info.absoluteResourcePath),
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
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    new webpack.DefinePlugin(env.stringified),
  ],
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'eval-source-map'
};
