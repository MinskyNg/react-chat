// Karma configuration
// Generated on Sun Oct 30 2016 23:22:06 GMT+0800 (CST)

module.exports = function(config) {
    config.set({

        basePath: '',

        frameworks: ['mocha', 'chai', 'sinon'],

        files: [
            'node_modules/babel-polyfill/dist/polyfill.min.js',
            './test/test.webpack.js'
        ],

        plugins: [
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-chai',
            'karma-sinon',
            'karma-phantomjs-launcher',
            // 'karma-chrome-launcher',
            'karma-coverage',
            'karma-webpack',
            'karma-sourcemap-loader'
        ],

        webpack: {
            devtool: 'inline-source-map',
            module: {
                loaders: [
                    { test: /\.css$/, loader: 'style!css' },
                    { test: /\.scss$/, loader: 'style!css!sass?sourceMap' },
                    {
                        test: /\.js[x]?$/,
                        exclude: /node_modules/,
                        loader: 'babel',
                        query: {
                            plugins: ['istanbul']
                        }
                    }
                ]
            },
            resolve: {
                extensions: ['', '.js', '.jsx'],
            }
        },

        webpackServer: {
            noInfo: true
        },

        exclude: [
        ],

        preprocessors: {
            'test/**/*.js': ['webpack', 'sourcemap'],
            'src/**/*.js': ['webpack', 'sourcemap', 'coverage']
        },

        reporters: ['mocha', 'coverage'],

        coverageReporter: {
            dir: 'coverage/',
            reporters: [
                { type: 'html' },
                { type: 'lcov', subdir: 'lcov' }
            ]
        },

        port: 9876,

        colors: true,

        logLevel: config.LOG_INFO,

        autoWatch: true,

        browsers: ['PhantomJS'],
        // browsers: ['Chrome'],

        singleRun: false,

        concurrency: Infinity
    });
};
