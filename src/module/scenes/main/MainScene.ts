import * as PIXI from 'pixi.js';

import { Application } from '@/module/Application';
import { pixiApplication } from '@/module/PixiApplication';

import { core, resourceManager, Image, Component, Label, Group } from 'pixi-skin';

import { getSkin } from '@/module/utils/GetSkin';
import { addSpine, playSpine } from '@/module/utils/Spine';
import { addTween } from '@/module/utils/util';

export class MainScene
{   
  public skin: Component;
  public skinName = 'MainSceneSkin';

  private bgContainer: Group;
  private uiContainer: Group;

  private progressText: Label;
  private progressBar: Image;
  private progressBarBg: Image;
  public constructor() {   
    // super();
    this.skin = getSkin(this.skinName);

    this.referenceBgContainer();
    pixiApplication.root.addChild(this.skin);
  }

  /**
   * 让VIEW在画布中居中显示，使用fixedwidth布局
   */
  private referenceBgContainer(){
    let scale = window.innerWidth / window.innerHeight;
    let realWidth = scale * Application.designHeight;
    realWidth = realWidth - Application.designWidth >> 1;
    this.skin.getReference('viewContent').x += realWidth;
  }

  /**
   * 每次打开都会调用
   */
  public async onOpen():Promise<void> {
    console.log('onOpen');
    
    this.addEvent();
    this.initView();
  }

  private addEvent() {
    this.skin.getReference('viewContent')
      .on('pointerdown', this.onTouchHandler.bind(this), true)
      .on('pointerup', this.onTouchHandler.bind(this), true)
      .on('pointerupoutside', this.onTouchHandler.bind(this));
  }

  private removeEvent() {
    this.skin.getReference('viewContent')
      .off('pointerdown', this.onTouchHandler.bind(this))
      .off('pointerup', this.onTouchHandler.bind(this))
      .off('pointerupoutside', this.onTouchHandler.bind(this));
  }

  private async initView() {
    this.uiContainer = this.skin.getReference('uiContainer');
    await this.initSpine();
    this.playSpine();
  }

  private onTouchHandler(evt){
    switch (evt.type) {
      case 'pointerdown':
        this.downSwitch(evt);
      break;
      case 'pointerup':
      case 'pointerupoutside':
        this.upSwitch(evt);
      break;
    }
  }

  private downSwitch(evt) {
    // 
    console.log('点击按下：evt.target', evt.target, 'evt.currentTarget', evt.currentTarget);
  }

  private upSwitch(evt) {
    // 
    console.log('点击抬起：evt.target', evt.target, 'evt.currentTarget', evt.currentTarget);

    if (evt.target && evt.target.id !== null) {
      switch (evt.target.id) {
        case 'btnPic':
        case 'btnText':
        case 'close':
          this.npcView.visible = this.npcAni.visible = false;
        break;
      }
    }
  }


  private npcAni: PIXI.spine.Spine;
  private npcDots: PIXI.spine.Spine;
  private npcView: Component;
  /**
   * 生成SPINE动画
   */
  private async initSpine() {
    let sceneWidth = window.innerWidth / window.innerHeight * Application.designHeight;

    this.npcAni = await addSpine('PopUp-NPC');
    this.npcDots = await addSpine('PopUp-Dots');
    this.npcView = getSkin('NpcViewSkin');

    // 摆放元素位置
    this.npcView.anchorOffsetX = 262;
    this.npcDots.x = this.npcView.x = this.npcAni.x = this.uiContainer.config.height - this.npcAni.width * 0.7 >> 1; // TODO * 0.7  动画的中心点不是居中的
    this.npcDots.y = this.npcAni.y = this.uiContainer.config.height >> 1;
    this.npcView.y = this.npcAni.y - 400;

    this.npcView.getReference('btnPic').y = 772;
    this.npcView.getReference('btnText').y = this.npcView.getReference('btnPic').y + 20;
    this.npcView.getReference('close').y = this.npcView.getReference('btnText').y + 130;

    this.uiContainer.addChild(this.npcAni);
    this.uiContainer.addChild(this.npcView);
    this.uiContainer.addChild(this.npcDots);
    this.npcView.visible = this.npcAni.visible = this.npcDots.visible = false;
    this.npcView.alpha = 0;

    let titlePic = this.npcView.getReference('titlePic');  // titlePic: Image
    // TODO 动态添加图片纹理
    titlePic.source = 'autumn_monkey_png';
  }

  private async playSpine() {
    const timeId = setTimeout(async ()=>{
      if(this.npcView) {
          this.npcView.visible = true;
          addTween(this.npcView, 0.3, {
              alpha: 1,
              repeat: 0
          });
      }
      if(this.npcDots) {
          this.npcDots.visible = true;
          await playSpine( this.npcDots, 'PopUpNewNPC-Dots');
          this.npcDots.visible = false;
      }
    }, 2000);
    this.npcAni.visible = true;
    await playSpine( this.npcAni, 'PopUpNewNPC1');
    playSpine( this.npcAni, 'PopUpNewNPC2', true);
    clearTimeout(timeId);
  }

  /**
   * 每次关闭都会调用
   */
  public async onClose():Promise<void> {
    console.log('onClose');

    // TODO 对onOpen创建的非公用元素进行销毁 或 回收到对象池
  }

  /**
   * override 销毁时调用
   */
  public onDispose(){
    pixiApplication.root.removeChild(this.skin);
    this.skin['clearChildren']();
    this.skin = null;
  }
}
