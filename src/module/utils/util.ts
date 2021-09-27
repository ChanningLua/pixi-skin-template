import { TweenMax } from 'gsap/TweenMax';
import { resourceManager, ResourceItem } from 'pixi-skin';

export function getPlatform () {
  if (window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      return 'ios';
  }
  return 'android';
}

export function getQuery (query) {
  const reg = new RegExp('(^|&)' + query + '=([^&]*)(&|$)')
  const res = window.location.search.substr(1).match(reg) || window.location.hash.substring((window.location.hash.search(/\?/)) + 1).match(reg)
  if (res != null) {
    return decodeURIComponent(res[2])
  }
}

/**
 * 
 * @param workFunc 间隔调用方法
 * @param start    开始值 
 * @param end      结束值
 * @param time     总时长
 * @param endFunc  结束调用方法
 * @returns 
 */
 export function work(workFunc = null, start, end, time, endFunc = null) {
  var timeStart = +new Date;
  var numSpan = end - start;    //相隔的数值
  var timeEnd,                  // 结束时间
      timer;                    //定时器

  timer = setInterval( function () {
    timeEnd = +new Date;  //当前时间

    var timeSpan = timeEnd - timeStart;  // 当前间隔时间
    var span = numSpan * timeSpan / time;  //当前间隔值

    if(workFunc) {
      workFunc(~~(start + span));
    }

    if (timeSpan > time) {   //超时清空
        if(workFunc) {
          workFunc(end);
        }
        if (timer) {
          timer.cancel && timer.cancel();
          timer = null;
        }
        if (endFunc) {
          endFunc();
        }
      }
    }
  , 20);
  return time;
}
        
export async function awaitAll(...fnArr) {
  if ({}.toString.call(fnArr[0]) === '[object Array]') {
    fnArr = fnArr[0];
  }
  const fnNum = fnArr.length;
  const promiseArr = [];
  const resultArr = [];
  for (let i = 0; i < fnNum; i++) {
    promiseArr.push(fnArr[i]());
  }
  for (let i = 0; i < fnNum; i++) {
    resultArr.push(await promiseArr[i])
  }
  return resultArr;
}

export function getResources (name: string) {
  let resources: string[] | ResourceItem[] = resourceManager.getGroupByName(name);
  resources = resources.map((resource)=>{
    return resource.url
  },this);

  let loadReousrces: string[] = [];
  let i:number = 0,len = resources.length;
  while (i < len) {
    if(!PIXI.loader.resources[resources[i]]){
      loadReousrces.push(resources[i]);
    }
    i++;
  }
  return loadReousrces;
}

export function addTween(display, time, params, ease = null){
  return new Promise((resolve)=>{
      params.onComplete = () => {
          tween && tween.kill();
          tween = null;
          resolve(true)
      }
      ease && (params.ease = ease);
      var tween = TweenMax.to(display, time, params);
  });
}

export function loadSource(urls){
    return new Promise((resolve) => {
        let loader = new PIXI.loaders.Loader();

        let len: number = urls.length - 1;
        let resourceVO = {};
        while(len >= 0){
            if(resourceVO[urls[len]]) {
                urls.splice(len, 1);
            } else if(PIXI.loader.resources[<string>urls[len]]) {
                urls.splice(len, 1);
            }
            resourceVO[urls[len]] = len;
            len--;
        }
        if(urls.length === 0){
            resolve(true);
        }
        
        loader.add(urls);
        loader.load(function(loader: PIXI.loaders.Loader, res: {[key: string]: PIXI.loaders.Resource}){

            let assets = Object.keys(loader.resources);
            assets.map((assets)=>{
                PIXI.loader.resources[assets] = loader.resources[assets];
            });
            loader.destroy();
            loader = null;
            resolve(true);
        }.bind(this));
    });
}