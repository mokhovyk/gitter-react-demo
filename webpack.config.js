const path = require('path');

module.exports = {
  mode: process.env.NODE_ENV === 'dev' ? 'development': 'production',

  entry: path.join(__dirname, '/client/src/index.js'),

  output: {
    path: path.join(__dirname, '/client/dist/'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader?presets[]=es2015,presets[]=react,presets[]=stage-2',
        }
      }
    ]
  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};