const path = require('path');
const webpack = require('webpack'); // remember to require this, because we DefinePlugin is a webpack plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const dotenv = require('dotenv');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = () => {
// call dotenv and it will return an Object with a parsed key
  const env = dotenv.config().parsed;

  // reduce it to a nice object, the same as before
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  return {
    mode: 'development',
    entry: ['babel-polyfill', 'whatwg-fetch', './src/client/index.jsx'],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '~_variables.sass': path.resolve(__dirname, 'src/client/styles/variables.scss'),
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
};
