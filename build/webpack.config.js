'use strict'
const path = require('path');
const enterdir = process.argv[process.argv.length - 1]
const buildConfig = require('./config');
const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

const webpackConfig = {
    mode: 'production',
    entry: buildConfig.entry,
    output: {
        filename: '[name].[hash:10].js',
        chunkFilename: 'bundle-[name].[chunkhash:10].js',
        path: buildConfig.distPath,
        publicPath: buildConfig.publicPath,
    },
    resolve: {
        extensions: ['.ts', '.js', '.json'],
        alias: {
            '@': path.join(__dirname, '../src')
        }
    },
    externals: {
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                // use: [
                //     {
                //         loader: 'ts-loader',
                //         options: {
                //             transpileOnly: true
                //         }
                //     }
                // ]
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), resolve('node_modules/pixi-viewport'), resolve('node_modules/@xes/wxjsbridge')]
            },
            {
                test: /\.s?css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            ident: 'postcss',
                            plugins: [
                                require('autoprefixer')(),
                                require('cssnano')(),
                            ],
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    name: 'static/[name]-[hash:10].[ext]',
                    limit: 81920,
                },
            }
        ]
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: "static",
            openAnalyzer: false
        }),
        new HtmlWebpackPlugin({
            template: "build/release/index.html",
            inject: true
        }),
        // 资源目录
        new webpack.DefinePlugin({
            ASSET_URL: JSON.stringify(buildConfig.assetUrl),
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        })
    ],
    // 这个用来关闭webpack警告建议 T_T
    performance: {
        hints: false,
    }
    ,
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
        minimize: true
    }
};

module.exports = webpackConfig;
