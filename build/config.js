'use strict';
const path = require('path')
const targetDir = path.join(__dirname,'../../wx-interaction-town/public')
const env = process.env.NODE_ENV
let assetUrl = 'https://static0.xesimg.com/common-material-storage/uiProject-online/bin-release/web/game/resource/'
if(env === 'dev'){
    assetUrl = 'https://static0.xesimg.com/common-material-storage/uiProject/bin-release/web/game/resource/'
}
const _distPath = path.join(__dirname,'./../town')
let _publicPath = `https://static0.xesimg.com/common-material-storage/uiProject${env === 'dev' ? '' : '-online'}/town/`
module.exports = {
    // 发布路径
    copyPath: targetDir,
    distPath: _distPath,
    publicPath: _publicPath,
    // webpack入口文件
    entry: {
        index: './src/index.ts',
    },
    // 默认会拷贝到发布目录
    resources: [
        "./uiProject/bin-release/web/game/resource"
    ],
    // 当前环境
    env: env,
    assetUrl: assetUrl
};
