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
// In development, we always serve from the root. This makes config easier.
const publicPath = '/';
// `publicUrl` is just like `publicPath`, but we will provide it to our app
// as %PUBLIC_URL% in `index.html` and `process.env.PUBLIC_URL` in JavaScript.
// Omit trailing slash as %PUBLIC_PATH%/xyz looks better than %PUBLIC_PATH%xyz.
const publicUrl = '';

// This is the development configuration.
// It is focused on developer experience and fast rebuilds.
module.exports = {
    mode: 'development',
    // You may want 'eval' instead if you prefer to see the compiled output in DevTools.
  // See the discussion in https://github.com/facebookincubator/create-react-app/issues/343.
  devtool: 'cheap-module-source-map',
  // These are the "entry points" to our application.
  // This means they will be the "root" imports that are included in JS bundle.
  // The first two entry points enable "hot" CSS and auto-refreshes for JS.
  entry: [
    // Include an alternative client for WebpackDevServer. A client's job is to
    // connect to WebpackDevServer by a socket and get notified about changes.
    // When you save a file, the client will either apply hot updates (in case
    // of CSS changes), or refresh the page (in case of JS changes). When you
    // make a syntax error, this client will display a syntax error overlay.
    // Note: instead of the default WebpackDevServer client, we use a custom one
    // to bring better experience for Create React App users. You can replace
    // the line below with these two lines if you prefer the stock client:
    // require.resolve('webpack-dev-server/client') + '?/',
    // require.resolve('webpack/hot/dev-server'),
    require.resolve('react-dev-utils/webpackHotDevClient'),
    // We ship a few polyfills by default:
    require.resolve('./polyfills'),
    // Errors should be considered fatal in development
    require.resolve('react-error-overlay'),
    // Provide the fetch API globally
    require.resolve('whatwg-fetch'),
    // Finally, this is your app's code:
    paths.appIndexJs,
    // We include the app code last so that if there is a runtime error during
    // initialization, it doesn't blow up the WebpackDevServer client, and
    // changing JS code would still trigger a refresh.
  ],
    resolve: {
      extensions: ['.js', '.jsx'],
      alias: {
        '~_variables.sass': path.resolve(__dirname, '../src/client/styles/variables.scss'),
      },
    },
    output: {
      // Next line is not used in dev but WebpackDevServer crashes without it:
      path: paths.appBuild,
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // This does not produce a real file. It's just the virtual path that is
      // served by WebpackDevServer in development. This is the JS bundle
      // containing code from all our entry points, and the Webpack runtime.
      filename: 'static/js/bundle.js',
      // There are also additional JS chunk files if you use code splitting.
      chunkFilename: 'static/js/[name].chunk.js',
      // This is the URL that app is served from. We use "/" in development.
      publicPath: publicPath,
      // Point sourcemap entries to original disk location
      devtoolModuleFilenameTemplate: info =>
        path.resolve(info.absoluteResourcePath),
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
