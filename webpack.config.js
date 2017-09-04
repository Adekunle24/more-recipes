// var webpack = require('webpack');
// var path = require('path');

// let BUILD_DIR = path.resolve(__dirname, 'public');
// let APP_DIR = path.resolve(__dirname, 'src');

// const config = {
//   entry: path.resolve(__dirname,'app.js'),
//   output: {
//     path: BUILD_DIR,
//     filename: 'bundle.js'
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['es2015']
//         },
//         exclude: /node_modules/,
//       }
//     ]
//   },
//   stats: {
//     colors: true
//   },
//   devtool: 'source-map'
// }; 

// module.exports = config;
var path = require('path');
//var nodeExternals = require('webpack-node-externals');
let BUILD_DIR = path.join(__dirname, '/public');
module.exports = {
  entry:
   './index.js',
  output: {
    path : path.join(BUILD_DIR,'/js'),
    filename: 'bundle.js',
    publicPath: BUILD_DIR
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  },
  //target: 'node',
  //externals: [nodeExternals()],
};