var path = require('path')
var webpack = require('webpack')
module.exports = {
  context: path.join(__dirname, 'src'),
  entry: './main.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components|dist)/,
        loader: 'babel'
      },
      {
        test: /\.css$/,
        loaders: [
          'style?sourceMap',
          'css?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
        ]
      },
      { test: /\.jpe?g$|\.svg$|\.png$/,
        exclude: /node_modules/,
        loader: 'file-loader?name=[path][name].[ext]'
      }
    ]
  },
  plugins: [
    new webpack.EnvironmentPlugin([
      'NODE_ENV'
    ])
  ],
  devServer: {
    historyApiFallback: true
  }
}
