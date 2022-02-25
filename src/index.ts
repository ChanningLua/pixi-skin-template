/// <reference path="./types.d.ts" />

import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
import 'pixi-spine';

import { Application } from '@/module/Application';
import { pixiApplication } from './module/PixiApplication';
import { assets } from './assetsVersion';
import { LoadingScene } from './module/scenes/loading/LoadingScene';

import { core , resourceManager } from 'pixi-skin';
import { awaitAll, getQuery } from './module/utils/util';
import { MainScene } from './module/scenes/main/MainScene';

pixiApplication.initParams({
  gameConfig: {
    renderType: 'canvas',                           // 渲染模式 canvas | webgl
    autoRender: true,                               // 自动开启渲染
    backgroundColor: 0xffffff,                      // 背景颜色
    resolution: 1,                                  // DPI比例
    width: Application.designWidth,                 // 宽
    height: Application.designHeight,               // 高
    parent: "rootPixi"                              // canvas父级
  }
})
// 初始化PIXIApplication
pixiApplication.init();
startScene();

async function startScene(){
  console.log('onInited', window.innerWidth, window.innerHeight);
  // 清空PIXI素材缓存池
  PIXI.loader.reset();
  // 加载素材配置
  await loadConfig();
  
  // 打开素材LOADDING
  // await moduleManager.open(LoadingScene);
  let loading = new LoadingScene();
  await loading.onOpen();

  // 发送素材开始加载事件
  core.dispatch('LoadingStart');

  // 请求接口与加载素材
  awaitAll(getInfo.bind(this), loadResource.bind(this)).then(async results => {
    // 发送素材结束加载事件
    core.dispatch('LoadingEnd');
    
    loading?.onClose();
    loading?.onDispose();
    loading = null;

    // TODO 打开主场景
    let main = new MainScene();
    await main.onOpen();
  }).catch((e) => {
    console.log(e);
  })
}

// TODO 需要model层过滤
async function getInfo(){
  console.log('getInfo')
}

/**
 * 加载素材配置文件
 * @returns Promise
 */
async function loadConfig(){
  return new Promise((resolve) => {
      let _url = Application.rootPath;
      console.log('loadConfig', _url);
      resourceManager.addConfig( assets, _url);
      resourceManager.loadConfig(() => {
        resolve(true);
      }, this);
  });
}

var totolNum;
/**
 * 加载素材队列
 * @returns Promise
 */
async function loadResource(){
  // 获取素材数组和数组长度
  let urls = getSourcesByGroupName('preload_loading');
  totolNum = urls.length;
  return new Promise((resolve) => {
    PIXI.loader.add(urls);
    PIXI.loader.on('progress', townProgress);
    PIXI.loader.load(async (loader: PIXI.loaders.Loader, res: {[key: string]: PIXI.loaders.Resource}) => {
      PIXI.loader.off('progress', townProgress);
      resolve(true);
    });
  });
}

function townProgress(evt){
  core.dispatch('LoadingProgress', evt.progress / 100 * totolNum, totolNum);
}

function getSourcesByGroupName(name){
   // 获取配置组素材名称
   let resources = resourceManager.getGroupByName(name);

   let urls = [];
   let i:number = 0, len = resources.length;
   while (i < len) {
       urls.push(resources[i].url);
       i++;
   }
   return urls;
}