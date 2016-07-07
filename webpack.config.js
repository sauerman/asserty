var path = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    path: './build/',
    filename: 'bundle.js',

    library: ['asserty']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loader: 'babel-loader',
      query: {
        presets: ['es2015']
      }
    }]
  },

  target: 'web',

  debug: true,
  devtool: 'source-map'

};