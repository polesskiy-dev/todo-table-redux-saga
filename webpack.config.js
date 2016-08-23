const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        // Set up an ES6-ish environment
        'babel-polyfill',
        './src-frontend/index'],
    output: {
        path: path.resolve('./public'),
        filename: 'js/bundle/bundle.js'
    },
    module: {
        //Validate by ESLint before loading
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint']
            }
        ],
        loaders: [
            //Compile ES6/7 to ES5 via babel
            {
                test: /\.js$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy'],
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
            //LESS
            {
                test: /\.(less)$/,
                loader: [
                    'style',
                    //The query parameter importLoaders allow to configure which loaders should be applied to @imported resources.
                    'css?modules&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5] ',
                    'autoprefixer',
                    'less'
                ].join('!')
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        //Extract css to file
        new ExtractTextPlugin('stylesheets/bundle/bundle.css')
    ],

    // Pretty terminal output
    stats: {colors: true},

    // Generate external sourcemaps for the JS & CSS bundles
    devtool: 'source-map',

    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};