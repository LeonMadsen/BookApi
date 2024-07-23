/* jshint esversion: 6 */

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'main.js',
        publicPath: '/'
    },
    mode: 'development',
    devServer: {
        contentBase: path.join(__dirname, 'output'),
        compress: true,
        port: 9000,
        hot: true,
        open: true,
        historyApiFallback: true,
        publicPath: '/',
        proxy: {
            '/api': 'http://localhost:3000'
        },
        https: true
    },
    plugins: [
        new MiniCssExtractPlugin({
        filename: 'main.css'
      }), 
    ],
    module: {
        rules: [
          { test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
         },
         {
            test: /\.scss$/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        },
        {
            test: /\.pug$/,
            use: {
                loader: 'pug-loader',
                options: {
                    pretty: true
                }
            }
        },
        {
            test: /\.(ico|png|jpe?g|webp|svg)$/,
            type: 'asset/resource',
            generator: {
                filename: 'img/[name].[hash:8][ext][query]'
            }
        }
            ]
}
}