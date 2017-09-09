

// module.exports = config;
const path = require('path');
// var nodeExternals = require('webpack-node-externals');
const BUILD_DIR = path.join(__dirname, '/public');
module.exports = {
  entry:
   './client.js',
  output: {
    path: path.join(BUILD_DIR, '/js'),
    filename: 'bundle.js',
    publicPath: BUILD_DIR
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' }
    ]
  },
};
