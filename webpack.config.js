const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

const isProd = process.env.NODE_ENV === 'production'
console.log('isProd', isProd)
const cssDev = ['style-loader', 'css-loader', 'sass-loader']
const cssProd = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: ['css-loader', 'sass-loader']
})
const cssConfig = isProd ? cssProd : cssDev

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: "source-map",
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }, {
        test: /\.scss$/,
        use: cssConfig
      }]
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    stats: "errors-only",
    hot:true,
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'main.css',
      disable: !isProd,
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      title: 'React/Redux project',
      template: './public/index.html',
      hash: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ]
}
