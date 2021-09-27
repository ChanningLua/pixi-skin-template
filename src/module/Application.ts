// import { engine, IInitParams } from "./engine/Engine";
// import { ResourceItem } from 'pixi-skin';

export class Application
{
    /**
     * 设计宽高
     *
     * @readonly
     * @type {number}
     * @memberof Application
     */
    public static designWidth: number = 750;
    public static designHeight: number = 1624;

    /**
     * 屏幕真实宽高
     *
     * @readonly
     * @type {number}
     * @memberof Application
     */
    public static sceneWidth: number = 0;
    public static sceneHeight: number = 0;

    /**
     * 设备内存
     */
    public static deviceMemory: number = 0;

    /**
     * 设备类型 7:ios 8:安卓
     */
    public static device: number = 0;

    /**
     * Pad:平板 Phone:手机
     */
    public static deviceType: string = 'Phone';

    /**
     * App 版本
     */
    public static appVersionNumber: number = 0;
    public static appVersion: string = '';

     /**
     * 静态资源地址
     *
     * @readonly
     * @type {string}
     * @memberof Application
     */
    public static rootPath: string = ASSET_URL

    public static init(params):void
    {
        // engine.initialize(params);
    }

}
