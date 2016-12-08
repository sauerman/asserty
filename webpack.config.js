var path = require('path');

module.exports = {
  entry: [
    './src/index.js',
  ],

  output: {
    path: './build/',
    filename: 'bundle.js',

    library: ['Asserty']
  },

  module: {
    loaders: [{
      test: /\.js$/,
      include: path.join(__dirname, 'src'),
      loaders: ['babel-loader', 'branch-transpiler']
    }]
  },

  target: 'web',

  debug: true,
  devtool: 'source-map'

};