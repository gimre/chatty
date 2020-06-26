
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './index.js'),
  mode: 'none',

  output: {
    path: path.resolve(__dirname, './static/dist'),
    filename: 'app.js'
  },

  resolve: {
    extensions: ['.js', '.mjs'],
  },

  module: {
    rules: [{
      test: /\.m?js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  }
}
