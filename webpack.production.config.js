var webpack = require('webpack');
var path = require('path');
var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js', Infinity),
        new UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
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
    devtool: 'cheap-source-map',
    entry: {
        index: [
            path.resolve(__dirname, 'src/index.js')
        ],
        vendor: [
            'react',
            'react-dom',
            'redux',
            'react-redux',
            'redux-immutable'
        ]
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '',
        filename: '[name]-[hash].js'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.scss$/, include: path.resolve(__dirname, 'src/styles'), loader: 'style!css!sass' },
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
