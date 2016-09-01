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

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src-frontend/**/*.spec.js': ['webpack'],
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
                'react/lib/ReactContext': true
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
        browsers: ['PhantomJS'/*,'Chrome', 'ChromeCanary', 'Firefox', 'Safari',  'Opera', 'IE'*/]
    })
}
