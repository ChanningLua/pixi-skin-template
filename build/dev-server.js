'use strict';
const webpack = require('webpack');
const config = require('./config');
config.assetUrl = "uiProject/bin-release/web/game/resource/"
const webpackConfig = require('./webpack.config.dev');
const utils = require('./utils');
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const chalk = require('chalk');
const env = config.env
let serverConfig = {};

module.exports = async () => {
    switch (env) {
        case 'dev':
            console.log(chalk.green("dev本地服务"));
            try {
                let location = await utils.intervalPort('127.0.0.1', 8080);
                serverConfig = {
                    mode: 'development',
                    devtool: 'source-map',
                    devServer: {
                        disableHostCheck: true,
                        historyApiFallback: true,
                        hot: true,
                        host: location.host,
                        port: location.port,
                        open: false,
                        overlay: {
                            warnings: false,
                            errors: true,
                        },
                        proxy: {'/api': ''},
                        publicPath: '/',
                        quiet: true,
                        watchOptions: {
                            poll: false,
                        },
                    },
                    plugins: [
                        new webpack.HotModuleReplacementPlugin(),
                        new webpack.NamedModulesPlugin(),
                        new webpack.NoEmitOnErrorsPlugin(),
                        new FriendlyErrorsPlugin({
                            compilationSuccessInfo: {
                                messages: [`请访问: http://${ location.host }:${ location.port }`],
                            },
                        }),
                    ],
                };
            } catch (err) {
                console.log(chalk.red("遇到错误",err));
            }
            break;
            
        case 'test':
            // 测试环境使用开发配置
            serverConfig = {
                mode: 'development',
                devtool: 'cheap',
            }
            break;

        default:
            // 发布环境使用发布配置
            serverConfig = {
                mode: 'production',
            };
    }
    // 本地运行去掉publicPath
    delete webpackConfig.output.publicPath
    const res = merge(webpackConfig, serverConfig);
    return res
};
