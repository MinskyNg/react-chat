var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    entry: {
        index: [
            path.resolve(__dirname, 'src/index.js'),
            hotMiddlewareScript
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath,
        filename: '[name].bundle.js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss$/, include: path.resolve(__dirname, 'src/styles'), loader: 'style!css!sass?sourceMap' },
            { test: /\.js[x]?$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /node_modules/,
                loader: 'babel'
            },
            { test: /\.(png|jpg)$/, loader: 'url?limit=8192' }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new HtmlWebpackPlugin({
            favicon: './src/favicon.ico',
            template: path.resolve(__dirname, 'src/index.tmpl.html'),
            inject: true,
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ],
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};
