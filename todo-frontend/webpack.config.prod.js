var path = require('path');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, '../todo-backend/public'),
    filename: 'bundle.min.js'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
        ],
        exclude: /node_modules/
      }, {
        test: /\.(scss|css)/,
        loader: 'style-loader!css-loader!sass-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackPlugin({title: 'React Redux BoilerPlate', template: './src/assets/index.html', hash: true}),
    new webpack.NamedModulesPlugin(),
    new webpack.LoaderOptionsPlugin({minimize: true, debug: false}),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(false)
    }),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV' : JSON.stringify('production')
    })
  ],
  devServer: {
    historyApiFallback:true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    stats: 'errors-only',
    port: 3000,
    disableHostCheck: true,
    host: "0.0.0.0"
  }
}
