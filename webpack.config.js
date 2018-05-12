// module.exports = config;
const path = require('path');
const webpack = require('webpack');
// var nodeExternals = require('webpack-node-externals');
const BUILD_DIR = path.join(__dirname, '/public');
module.exports = {
  entry: './src/App.js',
  output: {
    path: path.join(BUILD_DIR, '/js'),
    filename: 'bundle.js',
    publicPath: BUILD_DIR
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['react'],
            ['es2015'] // IMPORTANT
          ]
        }
      }]
      // loader: 'babel-loader?presets[]=es2015&presets[]=react'
    },
    {
      test: /\.css$/,
      use: [
        { loader: 'style-loader' },
        { loader: 'css-loader' },
      ],
    }
    ]
  },
  plugins: [
    // new webpack.DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify('production')
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    // sourceMap: true,
    // })
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    })
  ]
};
