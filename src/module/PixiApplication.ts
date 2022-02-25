import * as PIXI from 'pixi.js';
window['PIXI'] = PIXI;

import { 
    getObjectHashs,
    Injectable,
    core
} from 'pixi-skin';

/**
 * Pixi实现
*/
@Injectable
export class PixiApplication
{

    private _initParams:IInitParams;
    private _htmlWrapper:HTMLElement;
    private _game: PIXI.CanvasRenderer | PIXI.WebGLRenderer | any;
    private _ticker: any;

    // 主场景的比例
    public mainSceneScale:number;
    /**
     * 获取表现层HTML包装器，可以对其样式进行自定义调整
     * 
     * @readonly
     * @type {HTMLElement}
     * @memberof PixiApplication
     */
    public get htmlWrapper():HTMLElement
    {
        return this._htmlWrapper;
    }

    private _root:any;
    /**
     * 获取根显示节点
     * 
     * @readonly
     * @type {HTMLCanvasElement}
     * @memberof PixiApplication
     */
    public get root()
    {
        return this._root;
    }

    private _stage:any;
    /**
     * 获取舞台引用
     * 
     * @readonly
     * @type {PIXI.Stage}
     * @memberof PixiApplication
     */
    public get stage():any
    {
        return this._stage;
    }
    
    private _bgLayer:PIXI.Container;
    /**
     * 获取背景容器
     * 
     * @readonly
     * @type {PIXI.Container}
     * @memberof PixiApplication
     */
    public get bgLayer():PIXI.Container
    {
        return this._bgLayer;
    }

    private _sceneLayer:PIXI.Container;
    /**
     * 获取场景容器
     * 
     * @readonly
     * @type {PIXI.Container}
     * @memberof PixiApplication
     */
    public get sceneLayer():any
    {
        return this._sceneLayer;
    }

    private _topLayer:PIXI.Container;
    /**
     * 获取顶级容器
     * 
     * @readonly
     * @type {PIXI.Container}
     * @memberof PixiApplication
     */
    public get topLayer():any
    {
        return this._topLayer;
    } 

    
    public initParams(params:IInitParams)
    {
        this._initParams = params;

        if(!this._initParams.gameConfig)
        {
            this._initParams.gameConfig = {};
        }
    }
    
    public width:number = 0;
    public height:number = 0;
    public sceneWidth:number = 0;
    public sceneHeight:number = 0;

    public static PIXI;
    /**
     * 初始化表现层桥
     * @memberof PixiApplication
     */
    public init():void
    {
        if(typeof this._initParams.gameConfig['parent'] === "string")
        {
            this._htmlWrapper = document.getElementById(this._initParams.gameConfig['parent']);
        }
        else
        {
            this._htmlWrapper = this._initParams.gameConfig['parent'];
        }
        if(!this._htmlWrapper)
        {
            this._htmlWrapper = document.createElement("div");
            document.body.appendChild(this._htmlWrapper);
        }

        // 设置body的padding和margin为0，否则会有白边
        document.body.style.padding = "0";
        document.body.style.margin = "0";
        // 记录宽高
        this._initParams.gameConfig['parent'] = this._htmlWrapper;
        this.sceneWidth = this._initParams.gameConfig['width'];
        this.sceneHeight = this._initParams.gameConfig['height'];
        
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.reCalculateMainSceneAdjustScale()

        console.log('application', window.innerWidth, window.innerHeight);

        // fixedWide
        this._initParams.gameConfig['width'] = this.width / this.height * this.sceneHeight;

        // 生成Game
        // @ts-ignore
        this._game = new PIXI[this._initParams.gameConfig['renderType'] === 'canvas' ? 'CanvasRenderer' : 'WebGLRenderer'](
            {
                ...this._initParams.gameConfig,
                antialias: true,
                sharedTicker: true
            }
        );
        this._htmlWrapper.appendChild(this._game.view);
        this._game.view.style.touchAction = '';
        this._game['plugins'].interaction.autoPreventDefault = false;
        this._game.view.style.width = this.width + 'px';
        this._game.view.style.height = this.height + 'px';
        
        // 赋值stage
        this._stage = this._game;
        // world当做root
        this._root = new PIXI.Container();
        // 生成背景容器
        this._bgLayer = new PIXI.Container();
        this._root.addChild(this._bgLayer);
        // 生成场景容器
        this._sceneLayer = new PIXI.Container();
        this._root.addChild(this._sceneLayer);
        // 生成顶级容器.
        this._topLayer = new PIXI.Container();
        this._root.addChild(this._topLayer);
        // 开启渲染
        this._ticker = PIXI.ticker.shared;
        if (!this._initParams.gameConfig['autoRender'])
        {
            this._ticker.autoStart = false;
            this._ticker.stop();
        }
        this._ticker.add(this.render.bind(this));
    }

    private reCalculateMainSceneAdjustScale(){
        const canvasWidth = this.width / this.height * this.sceneHeight;
        this.mainSceneScale = this.width / canvasWidth;
    }
    /**
     * 重置舞台宽度
     */
    public resizeHeightScene(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        console.log('pixiResize', this.width, this.height);
        const canvasWidth = this.width / this.height * this.sceneHeight;
        this._game.resize(
            canvasWidth,
            this.sceneHeight
        )
        this._game.view.style.width = this.width + 'px';
        this._game.view.style.height = this.height + 'px';
        this.reCalculateMainSceneAdjustScale()
    }

    public resizeWidthScene(){
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        console.log('pixiResize', this.width, this.height);
        this._game.resize(
            this.sceneWidth,
            this.height / this.width * this.sceneWidth
        )
        this._game.view.style.width = this.width + 'px';
        this._game.view.style.height = this.height + 'px';
        this.reCalculateMainSceneAdjustScale()
    }
    
    /**
     * 判断皮肤是否是pixi显示对象
     * 
     * @param {*} skin 皮肤对象
     * @returns {boolean} 是否是pixi显示对象
     * @memberof PixiApplication
     */
    public isMySkin(skin:PIXI.Container):boolean
    {
        return skin instanceof PIXI.Container;
    }
    
    /**
     * 替换皮肤
     * 
     * @param {PIXI.Container} current 当前皮肤
     * @param {PIXI.Container} target 要替换的皮肤
     * @returns {PIXI.Container} 替换完毕的皮肤
     * @memberof PixiApplication
     */
    public replaceSkin( current:PIXI.Container, target:any):PIXI.Container
    {
        const parent:any = current.parent;
        parent.addChildAt(target, parent.getChildIndex(current));
        parent.removeChild(current);
        return target;
    }

    /**
     * 同步皮肤
     * 
     * @param {PIXI.Container} current 当前皮肤
     * @param {PIXI.Container} target 替换的皮肤
     * @memberof PixiApplication
     */
    public syncSkin(current:PIXI.Container, target:PIXI.Container):void
    {
        if(!current || !target) return;
        const props:string[] = [
            "matrix", "alpha", "visible", "worldVisible"
        ];
        if(current.width > 0) props.push("width");
        if(current.height > 0) props.push("height");
        for(const prop of props)
        {
            target[prop] = current[prop];
        }
    }
    
    /**
     * 创建一个空的显示对象
     *
     * @returns {PIXI.Container}
     * @memberof PixiApplication
     */
    public createEmptyDisplay():PIXI.Container
    {
        return new PIXI.Container();
    }
    
    /**
     * 创建一个占位符
     *
     * @returns {PIXI.Container}
     * @memberof PixiApplication
     */
    public createPlaceHolder():PIXI.Container
    {
        return this.createEmptyDisplay();
    }
    
    /**
     * 添加显示
     * 
     * @param {PIXI.Container} parent 要添加到的父容器
     * @param {PIXI.Container} target 被添加的显示对象
     * @return {PIXI.Container} 返回被添加的显示对象
     * @memberof PixiApplication
     */
    public addChild(parent:PIXI.Container, target:any):PIXI.Container
    {
        if(parent && target)
            return parent.addChild(target);
        else
            return target;
    }

    /**
     * 按索引添加显示
     * 
     * @param {PIXI.Container} parent 要添加到的父容器
     * @param {PIXI.Container} target 被添加的显示对象
     * @param {number} index 要添加到的父级索引
     * @return {PIXI.Container} 返回被添加的显示对象
     * @memberof PixiApplication
     */
    public addChildAt(parent:PIXI.Container, target:any, index:number):PIXI.DisplayObject
    {
        if(parent && target)
            return parent.addChildAt(target, index);
        else
            return target;
    }
    
    /**
     * 移除显示对象
     * 
     * @param {PIXI.Container} parent 父容器
     * @param {PIXI.Container} target 被移除的显示对象
     * @return {PIXI.Container} 返回被移除的显示对象
     * @memberof PixiApplication
     */
    public removeChild(parent:PIXI.Container, target:any):PIXI.DisplayObject
    {
        if(parent && target && target.parent === parent)
            return parent.removeChild(target);
        else
            return target;
    }

    /**
     * 按索引移除显示
     * 
     * @param {PIXI.Container} parent 父容器
     * @param {number} index 索引
     * @return {PIXI.Container} 返回被移除的显示对象
     * @memberof PixiApplication
     */
    public removeChildAt(parent:PIXI.Container, index:number):any
    {
        if(parent && index >= 0)
            return parent.removeChildAt(index);
        else
            return null;
    }
    
    /**
     * 移除所有显示对象
     * 
     * @param {PIXI.Container} parent 父容器
     * @memberof PixiApplication
     */
    public removeChildren(parent:PIXI.Container):void
    {
        if(parent) parent.removeChildren();
    }

    /**
     * 获取父容器
     * 
     * @param {PIXI.Container} target 目标对象
     * @returns {PIXI.Container} 父容器
     * @memberof PixiApplication
     */
    public getParent(target:PIXI.Container):PIXI.Container
    {
        return target.parent;
    }
    
    /**
     * 获取指定索引处的显示对象
     * 
     * @param {PIXI.Container} parent 父容器
     * @param {number} index 指定父级索引
     * @return {PIXI.DisplayObject} 索引处的显示对象
     * @memberof PixiApplication
     */
    public getChildAt(parent:PIXI.Container, index:number):PIXI.DisplayObject
    {
        return parent.getChildAt(index);
    }

    /**
     * 获取显示索引
     * 
     * @param {PIXI.Container} parent 父容器
     * @param {PIXI.Container} target 子显示对象
     * @return {number} target在parent中的索引
     * @memberof PixiApplication
     */
    public getChildIndex(parent:PIXI.Container, target:any):number
    {
        return parent.getChildIndex(target);
    }
    
    /**
     * 通过名称获取显示对象
     * 
     * @param {PIXI.Container} parent 父容器
     * @param {string} name 对象名称
     * @return {PIXI.DisplayObject} 显示对象
     * @memberof PixiApplication
     */
    public getChildByName(parent:PIXI.Container, name:string):PIXI.DisplayObject
    {
        for(let child of parent.children)
        {
            if(child["name"] === name)
            {
                return child;
            }
        }
        return null;
    }
    
    /**
     * 获取子显示对象数量
     * 
     * @param {PIXI.Container} parent 父容器
     * @return {number} 子显示对象数量
     * @memberof PixiApplication
     */
    public getChildCount(parent:PIXI.Container):number
    {
        return parent.children.length;
    }
    
    private _listenerDict:{[hash:string]:Function} = {};

    /**
     * 监听事件，从这个方法监听的事件会在中介者销毁时被自动移除监听
     * 
     * @param {PIXI.Container} target 事件目标对象
     * @param {string} type 事件类型
     * @param {Function} handler 事件处理函数
     * @param {*} [thisArg] this指向对象
     * @memberof PixiApplication
     */
    public mapListener(target:PIXI.Container, type:string, handler:any, thisArg?:any):void
    {
        const hash:string = getObjectHashs(target, type, handler, thisArg);
        if(!this._listenerDict[hash])
        {
            const wrappedHandler:any = thisArg ? handler.bind(thisArg) : handler;
            this._listenerDict[hash] = wrappedHandler;
            target.on(type,wrappedHandler);
        }
    }
    
    /**
     * 注销监听事件
     * 
     * @param {PIXI.Container} target 事件目标对象
     * @param {string} type 事件类型
     * @param {Function} handler 事件处理函数
     * @param {*} [thisArg] this指向对象
     * @memberof PixiApplication
     */
    public unmapListener(target:PIXI.Container, type:string, handler:any, thisArg?:any):void
    {
        const hash:string = getObjectHashs(target, type, handler, thisArg);
        const wrappedHandler:any = this._listenerDict[hash];
        if(wrappedHandler)
        {
            target.off(type,wrappedHandler);
            delete this._listenerDict[hash];
        }
    }

    private render(){
        if (this._game && this._root) {
            this._game.render(this._root);
        } 
    }

    /**
     * 开启渲染
     * 
     * @memberof PixiApplication
     */
    public startRender(){
        this._ticker.start();
    }

    /**
     * 关闭渲染
     * 
     * @memberof PixiApplication
     */
    public stopRender(){
        this._ticker.stop();
    }
}

export interface IInitParams
{
    /**
     * Phaser.Game需要的初始化配置
     *
     * @type {Object}
     * @memberof IInitParams
     */
    gameConfig?:Object;
}


/** 再额外导出一个单例 */
export const pixiApplication:PixiApplication = core.getInject(PixiApplication)