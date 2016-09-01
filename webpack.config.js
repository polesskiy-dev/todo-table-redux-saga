const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: {
        bundle: ['babel-polyfill', './src-frontend/index']
    },
    output: {
        path: path.resolve('./public'),
        filename: 'js/bundle/[name].js'
    },
    module: {
        //Validate by ESLint before loading
        preLoaders: [
            {
                test: /\.js|\.spec.js$/,
                loaders: ['eslint']
            }
        ],
        loaders: [
            //Compile ES6/7 to ES5 via babel
            {
                test: /\.(js)$/,
                loader: ['babel-loader'],
                exclude: /node_modules/,
                query: {
                    plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-class-properties'],
                    presets: ['react', 'es2015', 'stage-0', 'airbnb']
                }
            },
            //LESS
            {
                test: /\.(less|css)$/,
                loader: ExtractTextPlugin.extract(
                    'style',
                    'css?modules&importLoaders=1&localIdentName=[name]---[local]---[hash:base64:5]',
                    'autoprefixer',
                    'less')
            }
        ]
    },

    plugins: [
        new webpack.NoErrorsPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
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