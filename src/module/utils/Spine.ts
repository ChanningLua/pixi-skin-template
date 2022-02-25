import { resourceManager } from "pixi-skin";
import { loadSource } from "./util";

export function loadSpine(jsonName: string, atlasName: string, pngName: Array<string> | string){
    return new Promise((resolve)=>{
    
        let json: string= resourceManager.getResourceItem(jsonName).url;
        let atlas: string = resourceManager.getResourceItem(atlasName).url;
        let pngs: Array<string> = [];
        if(pngName instanceof Array){
            pngName.map((name)=>{
                pngs.push(resourceManager.getResourceItem(name).url);
            })
        } else {
            pngs.push(resourceManager.getResourceItem(pngName).url);
        }
        pngs.push(json);
        pngs.push(atlas);
        loadSource(pngs).then(()=>{
            return resolve(true);
        });
    })
}

export async function addSpine(buildName){
    await preloadFade(buildName);
    let assetUrls = getSpineUrls(buildName);
    let animation = createSpine(assetUrls.json, assetUrls.atlas, assetUrls.png, PIXI.loader.resources);
    return animation;
    
}

export function playSpine(animation, animationName: string, isLoop: boolean = false){
    return new Promise(async (resolve)=>{
        animation.state.hasAnimation(animationName) && animation.state.setAnimation(0, animationName, isLoop);
        animation.alpha = 1;
        // 单次播放结束执行
        animation.state.onComplete = ()=>{
            animation.state.onComplete = null;
            resolve(true);
        }
    })
}

export function createSpine(json, atlas, png, resources) {
    let rawSkeletonData = resources[json]?.data;
    let rawAtlasData = resources[atlas]?.data;

    let spineAtlas = new PIXI.spine.core.TextureAtlas(rawAtlasData, (line, callback) => {
        callback(PIXI.BaseTexture.from(png));
    });

    let spineAtlasLoader = new PIXI.spine.core.AtlasAttachmentLoader(spineAtlas);
    let spineJsonParser = new PIXI.spine.core.SkeletonJson(spineAtlasLoader);

    let spineData = spineJsonParser.readSkeletonData(rawSkeletonData);

    return new PIXI.spine.Spine(spineData);
}

export function preloadFade(fadeName: string){
    if(!fadeName && fadeName.length === 0) return;
    return new Promise(async (resolve)=>{
        let assets = getSpineName(fadeName);
        let resources = PIXI.loader.resources;
        let assetUrls = getSpineUrls(fadeName);

        if (!resources[assetUrls.json]){
            await loadSpine(
                assets.json,
                assets.atlas,
                assets.png
            );
            resolve(true);
        } else {
            resolve(true);
        }
    })
}


export function getSpineUrls(assetsName: string) {
    let json: string = resourceManager.getResourceItem(assetsName+'_json').url;
    let atlas: string = resourceManager.getResourceItem(assetsName+'_atlas').url;
    let png: string = resourceManager.getResourceItem(assetsName+'_png').url;
    return {
        json,atlas,png
    }
}

export function getSpineName(assetsName: string) {
    let json: string = resourceManager.getResourceItem(assetsName+'_json').name;
    let atlas: string = resourceManager.getResourceItem(assetsName+'_atlas').name;
    let png: string = resourceManager.getResourceItem(assetsName+'_png').name;
    return {
        json,atlas,png
    }
}