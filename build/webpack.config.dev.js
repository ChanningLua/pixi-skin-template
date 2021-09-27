'use strict';
const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

const webpackDevConfig = merge(webpackConfig, {
    mode: 'development',
    devtool: 'cheap-source-map',
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
              vendors: {
                test: /[\\/]node_modules[\\/]/,
                priority: -10
              },
              default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
              }
            }
        },
        minimize: false
    }
});

module.exports = webpackDevConfig;