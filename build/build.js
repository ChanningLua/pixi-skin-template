const webpack = require('webpack');
const gulp = require('gulp');
const del = require('del');
const exec = require('child_process').exec;
const path = require('path');
// const shell = require('shelljs');
const fs = require('fs');
const join = require('path').join;
const replace = require('gulp-replace');
// const rename = require("gulp-rename");
const buildConfig = require('./config');
const chalk = require('chalk');


const verName = "V1_0_0"

const env = buildConfig.env
module.exports = function () {
    return new Promise((resolve, reject) => {
        console.log(chalk.green("当前环境是： " + env + "， 执行发布脚本"));
        resolve();
    })

    // 清理发布目录
    .then((data) => {
        console.log(chalk.green("-----------------------------------------------"));
        console.log(chalk.green("清理发布目录"));
        return del(buildConfig.distPath,{force: true});
    })

    // 清理拷贝目录
    // .then((data) => {
    //     console.log(chalk.green("-----------------------------------------------"));
    //     console.log(chalk.green("清理拷贝目录"));
    //     return del(buildConfig.copyPath,{force: true});
    // })

    // webpack打包 index
    .then((data) => {
        return new Promise((resolve, reject) => {
            console.log(chalk.green("-----------------------------------------------"));
            console.log(chalk.green("开始执行webpack打包"));
            let config;
            // 判断环境以调整打包策略
            switch(env)
            {
                case "dev":
                    console.log(chalk.green("当前环境为测试环境"));
                    config  = require('./webpack.config.dev');
                    break;
                default:
                    console.log(chalk.green("当前环境为线上环境"));
                    config  = require('./webpack.config');
                    break;
            }
            webpack(config, function (err, stats) {
                if (err) {
                    throw err;
                }
                process.stdout.write(stats.toString({
                    colors: false,
                    modules: false,
                    children: false,
                    chunks: false,
                    chunkModules: false
                }) + '\n\n');

                if (stats.hasErrors()) {
                    console.log(chalk.red("webpack打包失败\n"));
                    process.exit(1);
                }

                console.log(chalk.green("webpack打包完成\n"));
                resolve();
            });
        });
    })

    // 拷贝 dist 到 node项目
    // .then((data) => {
    //     return new Promise((resolve, reject) => {
    //         console.log(chalk.green("-----------------------------------------------"));
    //         console.log(chalk.green("拷贝 dist 到 node项目"));
    //         let list;
    //         if (buildConfig.distPath instanceof Array) {
    //             list = buildConfig.distPath.map(item => path.join(item, "**/*"));
    //         } else {
    //             list = path.join(buildConfig.distPath, "**/*");
    //         }
    //         gulp.src(list, { base: "." })
    //             .pipe(gulp.dest(buildConfig.copyPath))
    //             .once("end", (evt) => {
    //                 console.log(chalk.green("拷贝完毕，输出文件到" + buildConfig.copyPath));
    //                 resolve();
    //             });
    //     });
    // })

    // 拷贝库文件 resources 配置的目录到 dist
    .then((data) => {
        return new Promise((resolve, reject) => {
            console.log(chalk.green("-----------------------------------------------"));
            console.log(chalk.green("拷贝resources配置 " + buildConfig.resources + " 到发布目录"));
            let list;
            if (buildConfig.resources instanceof Array) {
                list = buildConfig.resources.map(item => path.join(item, "**/*"));
            } else {
                list = path.join(buildConfig.resources, "**/*");
            }
            gulp.src(list, { base: "." })
                .pipe(gulp.dest(buildConfig.distPath))
                .once("end", (evt) => {
                    console.log(chalk.green("拷贝完毕，输出文件到" + buildConfig.distPath));
                    resolve();
                });
        });
    })

    .then((data) => {
        return new Promise((resolve, reject) => {
            console.log(chalk.green("-----------------------------------------------"));
            console.log(chalk.green("发布脚本执行完毕。"));
            
            resolve(buildConfig.copyPath);
        });
    });
}

function getJsonFiles(jsonPath) {
    let jsonFiles = [];
    function findJsonFile(path) {
      let files = fs.readdirSync(path);
      files.forEach(function (item, index) {
        let fPath = join(path, item);
        let stat = fs.statSync(fPath);
        if (stat.isDirectory() === true) {
          findJsonFile(fPath);
        }
        if (stat.isFile() === true) {
          jsonFiles.push(fPath);
        }
      });
    }
    findJsonFile(jsonPath);
    // console.log(jsonFiles)
    return jsonFiles;
}

// 兼容直接调用
const args = process.argv;
for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    if (arg.substr(0, 6) === '--env-') {
        const env = arg.substr(6);
        module.exports({ env });
    }
}

