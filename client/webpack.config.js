const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';
const CURRENT_PATH = __dirname;
const BASE_PATH = "./";
const OUT_DIR_PATH = `${BASE_PATH}/dist`;
const extractStyles = new ExtractTextPlugin({
  filename: "styles/[name].[contenthash].css",
  allChunks: true,
  disable: isDevelopment
});
const setUrlLoaderOutput = folder => isDevelopment ? `${folder}/[name].[ext]` : `${folder}/[hash].[ext]`

let config = {
  stats: {
    modules: false
  },

  context: CURRENT_PATH,

  devtool: isDevelopment ? "inline-source-map" : false,

  entry: {
    app: `${BASE_PATH}/src/app.ts`
  },

  output: {
    filename: isDevelopment ? "[name].js" : "[name].[chunkhash].js",
    publicPath: "./",
    path: path.join(CURRENT_PATH, OUT_DIR_PATH),
    library: "lykke",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: "pre",
        loader: "tslint-loader",
        options: {
          configFile: "./tslint.json",
          failOnHint: false,
          fix: true
        }
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.(sass|scss|css)$/,
        loader: extractStyles.extract({
          fallback: "style-loader",
          use: [{
            loader: "css-loader?minimize",
          },
          {
            loader: "sass-loader"
          }
          ]
        })
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: `url-loader?limit=10000&mimetype=application/octet-stream&name=${setUrlLoaderOutput('fonts')}`,
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: `url-loader?limit=10000&mimetype=image/svg+xml&name=${setUrlLoaderOutput('images')}`,
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: file => {
            return isDevelopment ? 'fonts/[name].[ext]' : 'fonts/[hash].[ext]'
          }
        }
      },
      {
        test: /\.(woff|woff2)$/,
        loader: `url-loader?prefix=font/&limit=5000&name=${setUrlLoaderOutput('fonts')}`,
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: ['file-loader']
      }]
  },

  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Popper: ['popper.js', 'default'],
      'window.Popper': ['popper.js', 'default'],
    }),
    extractStyles,
    new HtmlWebpackPlugin({
      template: "index.html",
      inject: true,
      minify: {
        collapseWhitespace: true
      }
    }),
    new webpack.DefinePlugin({
      DEBUG_MODE: isDevelopment
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor",
      minChunks: module => module.context && module.context.indexOf('node_modules') > -1
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: "manifest"
    }),
    new CopyWebpackPlugin([
      { from: 'images', to: 'images' }
    ]),

  ],

  externals: {},

  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      '@models': path.resolve(CURRENT_PATH, `${BASE_PATH}/src/models`),
      '@stores': path.resolve(CURRENT_PATH, `${BASE_PATH}/src/stores`),
      '@elements': path.resolve(CURRENT_PATH, `${BASE_PATH}/src/elements`),
      '@services': path.resolve(CURRENT_PATH, `${BASE_PATH}/src/services`),
      '@images': path.resolve(CURRENT_PATH, `${BASE_PATH}/images`),
    }
  }
};

if (isDevelopment) {
  config.output.publicPath = 'http://localhost:3000/';
  config["devServer"] = {
    contentBase: OUT_DIR_PATH,
    host: 'localhost',
    port: 3000,
    hot: true
  };

  config.plugins.push(
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin());
} else {
  config.plugins.push(new UglifyJsPlugin());
  config.externals["mobx-react-devtools"] = "mobxDevtools";
}

module.exports = config;