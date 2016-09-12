// Karma configuration
// Generated on Wed Aug 31 2016 16:27:40 GMT+0300 (EEST)

var webpackConfig = require('./webpack.config');

module.exports = function (config) {
    config.set({
        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],

        // list of files / patterns to load in the browser
        files: [
            {pattern: 'src-frontend/**/*.spec.js', watched: false}
        ],
        exclude: [
            'src-frontend/**/*.jest.spec.js'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            // 'src-frontend/**/*.spec.js': ['webpack', 'sourcemap'],
            'src-frontend/**/*.js': ['webpack', 'sourcemap'],
        },

        //webpackConfig
        webpack: {
            devtool: webpackConfig.devtool,
            module: {
                loaders: webpackConfig.module.loaders
            },
            plugins: webpackConfig.plugins,
            resolve: webpackConfig.resolve,
            externals: {
                'cheerio': 'window',
                'react/addons': true,
                'react/lib/ExecutionEnvironment': true,
                'react/lib/ReactContext': 'window',
                'text-encoding': 'window'
            }
        },

        //hide info about bundling
        webpackMiddleware: {
            noInfo: true,
        },

        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['mocha'],

        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'/*,'Chrome'/*, 'ChromeCanary', 'Firefox', 'Safari',  'Opera', 'IE'*/],

        //if true, Karma will start and capture all configured browsers, run tests and then exit with an exit code of 0 or 1 depending on whether all tests passed or any tests failed.
        singleRun: true
    })
}
