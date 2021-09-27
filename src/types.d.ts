declare module '*.htm'
{
    const str: string;
    export default str;
}

declare module '*.html'
{
    const str: string;
    export default str;
}

declare module '*.css'
{
    const str: string;
    export default str;
}

declare module '*.scss'
{
    const str: string;
    export default str;
}

declare module '*.json'
{
    const dict: {[key:string]:any};
    export default dict;
}

declare module '*.tsx'
{
    const str: string;
    export default str;
}

declare module "*.png";

declare module "*.ogg";

declare module "*.mp3";

declare interface Window {
    PIXI: any
}

declare const ASSET_URL: string;
declare const NODE_ENV: string;
