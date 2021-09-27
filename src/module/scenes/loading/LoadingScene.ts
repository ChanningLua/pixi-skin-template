import * as PIXI from 'pixi.js';

import { Application } from '@/module/Application';
import { pixiApplication } from '@/module/PixiApplication';

import { core, resourceManager, Image, Component, Label, Group } from 'pixi-skin';

import { loadSource } from '@/module/utils/util';
import { getSkin } from '@/module/utils/GetSkin';

export class LoadingScene// extends SceneMediator
{   
  public skin: Component;
  public skinName = 'LoadingSceneSkin';

  private bgContainer: Group;
  private progressText: Label;
  private progressBar: Image;
  private progressBarBg: Image;
  public constructor() {   
    // super();
    this.skin = getSkin(this.skinName);
    this.referenceBgContainer();
    pixiApplication.root.addChild(this.skin);
  }

  private referenceBgContainer(){
    let scale = window.innerWidth / window.innerHeight;
    let realWidth = scale * Application.designHeight;
    realWidth = realWidth - Application.designWidth >> 1;
    this.skin.getReference('viewContent').x += realWidth;
  }

  public async onOpen():Promise<void> {
    console.log('onOpen');

    await this.initView();
    this.addEvent();
    this.setView();
  }

  private async initView(){
    this.bgContainer = this.skin.getReference('bgContainer');
    this.progressBar = this.bgContainer.getReference('progressBar');
    this.progressBarBg = this.bgContainer.getReference('progressBarBg');
    this.progressText = this.bgContainer.getReference('progressText');

    // 设置遮罩
    let graphics = new PIXI.Graphics();
    graphics.beginFill(0x66CCFF);
    graphics.drawRoundedRect(0, 0, this.progressBarBg.width, this.progressBarBg.height, 8);
    graphics.endFill();
    this.progressBar.mask = graphics;
    graphics.x = this.progressBarBg.x;
    graphics.y = this.progressBarBg.y;
    this.bgContainer.addChild(graphics)

    // 设置PIXI窗口适配模式为fixedHeight模式
    pixiApplication.resizeScene();

    // await this.loadSpine();
  }

  // private loadSpine(){
  //   return new Promise(async (resolve)=>{
  //     PIXI.loader['_afterMiddleware'].pop();
    
  //     let json = resourceManager.getResourceItem('MainLoading_json').url;
  //     let atlas =  resourceManager.getResourceItem('MainLoading_atlas').url;
  //     let png =  resourceManager.getResourceItem('MainLoading_png').url;

  //     await loadSource([json, atlas, png]);
  //     this.showAnimation(json, atlas, png);
  //     resolve();
  //   })
  // }

  // private showAnimation(json, atlas, png){

  //   let rawSkeletonData = PIXI.loader.resources[json]?.data;
  //   let rawAtlasData = PIXI.loader.resources[atlas]?.data;

  //   let spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, function (line, callback) {
  //       callback(PIXI.BaseTexture.from(png));
  //   });

  //   let spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
  //   let spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);

  //   let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);

  //   let animation = new PIXI.spine.Spine(spineData);
    
  //   animation.position.set(381, 620);

  //   animation.state.hasAnimation('MainLoadingLoop') && animation.state.setAnimation(0, 'MainLoadingShow', true)
  //   animation.state.onComplete = ()=>{
  //     animation.state.onComplete = null;
  //     animation.state.hasAnimation('MainLoadingLoop') && animation.state.setAnimation(0, 'MainLoadingLoop', true);
  //   }
  //   this.bgContainer.addChild(animation);
  // }
  
  private setView(){
    this.progressBar.x = this.progressBarBg.x - this.progressBarBg['_config'].width;
  }

  private addEvent(){
    core.listen('LoadingProgress', this.setProgress, this);
  }

  private removeEvent(){
    core.unlisten('LoadingProgress', this.setProgress, this);
  }

  public async onClose():Promise<void> {
    this.removeEvent();
  }

  /**
   * override
   */
  public onDispose(){
    pixiApplication.root.removeChild(this.skin);
    this.skin['clearChildren']();
    this.skin = null;
  }

  public setProgress(current, total):void {
    let percent:number = Math.floor(current / total * 100);
    this.progressBar.x = this.progressBarBg.x - ~~this.progressBarBg.config.width + ~~this.progressBarBg.config.width * current / total;
    this.progressText.text = "正在前往 " + percent + "%";
  }
}
