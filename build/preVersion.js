/* eslint-disable */

const path = require("./core/path");
const file = require("./core/file");

const fs = require("fs");

const exec = require('child_process').exec;
const del = require('del');
const crc32 = require("./core/crc32");

const params = require("./core/params_analyze.js");
const option = params.getArgv()["opts"];
const shell = require('shelljs');

var publish_path = option["--publishPath"][0]   // "static/interaction-assets";

var project_path = option["--releasePath"][0]		// "./bin-release/web/game";
var project_path = path.join(project_path);

var resouce_root = option["--resourceRoot"][0]		//"resource"

var resouce_json = option["--resPath"][0]			//"resource/default.res.json";
var resource_path = path.join(project_path, resouce_json);


const readFile = function (fileName) {
    var fileData = file.read(fileName);
    return fileData;
};

const saveFile = function (fileName, json) {
    file.save(fileName, json);
};

const crcFile = function (filePath) {
    var txt = file.read(filePath);
    var txtCrc32 = crc32(txt);

    var newName = txtCrc32 + "_" + fs.statSync(filePath).size + "." + file.getExtension(filePath);
    var newUrl = "assets/" + txtCrc32.substring(0, 2) + "/" + newName;

    return newUrl;
}
function removeEmpty (realPath) {
	var fileList = file.getDirectoryListing(realPath, true);

	if (fileList.length > 0) {
			for (var key in fileList) {
					 var fileName = fileList[key];
					 if (file.isDirectory(path.join(realPath, fileName))) {
							 removeEmpty(path.join(realPath, fileName))
					 }
			 }
	}
	
	var fileList = file.getDirectoryListing(realPath, true);
	if (fileList.length == 0) {
			file.remove(realPath);
	}
}

function copyIt(from, to) {

  fs.writeFileSync(to, fs.readFileSync(from));
  //fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
}

return new Promise((resolve, reject) =>
	{
        console.log("执行发布脚本")
				shell.cd(publish_path + '');
        resolve();
    })

	// 清理发布目录
	.then((data) => {
		console.log("-----------------------------------------------");
		console.log("清理发布目录", project_path);
		return del(project_path);
	})

	// 编译
	.then((data) => {
		return new Promise((resolve, reject) => {
			console.log("-----------------------------------------------");
			console.log("开始执行编译egret" );
			// 发布
			exec("egret publish --version game", (err, stdout) => {
				console.log(stdout);
				console.log("编译执行完毕");
				resolve();
			});
		});
	})
	
	// 添加版本号
	.then((data) => {
		console.log("-----------------------------------------------");
		console.log("添加文件版本号");
		//处理 assets.json 内文件
		if (file.exists(resource_path)) {
			var resource = readFile(resource_path);
			var re = JSON.parse(resource);
			var resources = re["resources"];

			var crcFiles = [];

			for (var i = 0; i < resources.length; i++) {
				var url = resources[i].url;

				var filePath = path.join(project_path, resouce_root, url);
				var txt = file.read(filePath);
				var newUrl = crcFile(filePath);

				resources[i].url = newUrl;

				crcFiles.push(filePath);

				if (resources[i].type == "font") {
					try {
						var sheetJson = JSON.parse(txt);
						var pngfile = sheetJson.file;
						if (pngfile.charAt(0) == "/") {
							pngfile = pngfile.substring(1);
						}
					}
					catch(e) {
						pngfile = "";
						var lines = txt.split("\n");
						var pngLine = lines[2];
						var index = pngLine.indexOf("file=\"");
						if (index != -1) {
							pngLine = pngLine.substring(index + 6);
							index = pngLine.indexOf("\"");
							pngfile = pngLine.substring(0, index);
						}
					}

					var pngfilePath = path.join(path.dirname(filePath), pngfile);
					var newUrl1 = crcFile(pngfilePath);

					file.copy(pngfilePath, path.join(project_path, resouce_root, newUrl1));
					
					crcFiles.push(pngfilePath);
					newUrl1 = newUrl1.replace("assets", "..");
					txt = txt.replace(pngfile, newUrl1);

					file.save(path.join(project_path, resouce_root, newUrl), txt);
				}
				else if (resources[i].type == "sheet") {
					var sheetJson = JSON.parse(txt);
					var pngfile = sheetJson.file;

					pngfile = path.join(path.dirname(filePath), pngfile);
					var newUrl1 = crcFile(pngfile);
					
					file.copy(pngfile, path.join(project_path, resouce_root, newUrl1));
					
					crcFiles.push(pngfile);

					sheetJson.file = newUrl1.replace("assets", "..");

					file.save(path.join(project_path, resouce_root, newUrl), JSON.stringify(sheetJson));
				}
				else {
					file.copy(filePath, path.join(project_path, resouce_root, newUrl));
				}
			}

			for (let i = 0;i < crcFiles.length; i++) {
				if (file.exists(crcFiles[i])) {
					file.remove(crcFiles[i]);
				}
			}

			saveFile(resource_path, JSON.stringify(re, null, 4))

			var reCrc = crc32(JSON.stringify(re, null, 4));
			// fs.statSync(thmPath).size
			var newUrl = resouce_root + "/" + reCrc + "." + file.getExtension(resource_path);
			saveFile(path.join(project_path, newUrl), JSON.stringify(re, null, 4));
			file.remove(resource_path);

			// 修改代码
			var mainPath = path.join(project_path, "assetsVersion.ts");
			var mainTxt = file.read(mainPath);
			mainTxt = '/* eslint-disable */\nexport var assets = "' + reCrc + '.json";\n';
			saveFile(mainPath, mainTxt);
		}
		return removeEmpty(path.join(project_path));
	})
	
	.then(() => {
		return new Promise((resolve, reject) => {
			console.log("-----------------------------------------------");
			console.log("拷贝assets名称");
			shell.cd('../');
			copyIt(publish_path + '/' + project_path + '/assetsVersion.ts', 'src/assetsVersion.ts');
			resolve();
		});
	})

	.then((data) => {
		return new Promise((resolve, reject) => {
			console.log("-----------------------------------------------");
			console.log("脚本执行完毕。");
			resolve(project_path);
		});
	});
