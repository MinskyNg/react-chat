var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

var publicPath = 'http://localhost:3000/';
var hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true';

module.exports = {
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            favicon: path.resolve(__dirname, 'src/favicon.ico'),
            template: path.resolve(__dirname, 'src/index.tmpl.html')
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new OpenBrowserPlugin({ url: 'http://localhost:3000' })
    ],
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
    resolve: {
        extensions: ['', '.js', '.jsx'],
    }
};
