import * as PIXI from 'pixi.js';

import { Application } from '@/module/Application';
import { pixiApplication } from '@/module/PixiApplication';

import { core, resourceManager, Image, Component, Label, Group } from 'pixi-skin';

import { getSkin } from '@/module/utils/GetSkin';

export class MainScene
{   
  public skin: Component;
  public skinName = 'MainSceneSkin';

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
  }

  private async initView(){
    
  }

  public async onClose():Promise<void> {
    console.log('onClose');
  }

  /**
   * override
   */
  public onDispose(){
    pixiApplication.root.removeChild(this.skin);
    this.skin['clearChildren']();
    this.skin = null;
  }
}
