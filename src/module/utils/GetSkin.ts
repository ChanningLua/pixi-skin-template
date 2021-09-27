import { skinDict, View } from "pixi-skin";
import { skinList } from "../skin/SkinList";

/**
 * 根据皮肤名称获取对应的显示树
 * 
 * @param skinName 皮肤对应的名称
 * @returns {skin} 
 */
 export function getSkin(skinName){
    let skin = getSkinByName(skinName);
    skinDict[skinName] = skin;
    let component: View = new View();
    component.parseSkinConfig(skinName);
    return component.getSkin();
}

/**
 * 根据SKIN名称获取对应的XML文本
 * @param skinName SKIN名称
 */
export function getSkinByName(skinName: string){
  let skinClass = skinList[skinName];
  if (!skinClass) {
    throw Error(`getSkinByName: ${skinName} is not defined;`);
  }
  return skinClass();
}