/**
 * 关联场景皮肤
 */
export var skinList: Object = {
  'LoadingSceneSkin': getLoadingSkin,
  'MainSceneSkin': getMainSceneSkin
}

function getMainSceneSkin(){
  return `<?xml version='1.0' encoding='utf-8'?>
  <e:Skin class="MainSceneSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:ns1="*">
    <e:Group id="viewContent" height="1624" width="750" y="0" x="0" touchEnabled="true" name="view">
      <e:Group id="bgContainer" width="1218" height="1624" y="0" x="-234">
        <e:Image id="background" scaleX="1" scaleY="1" x="0" y="0" height="1625" width="1218" source="bg_jpg"/>
      </e:Group>
    </e:Group>
  </e:Skin>`;
}

function getLoadingSkin(){
  return `<?xml version="1.0" encoding="utf-8"?>
  <e:Skin class="LoadingSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing">
    <e:Group id="viewContent" height="1624" width="750" y="0" x="0">
        <e:Group id="bgContainer" width="1218" height="1624" y="0" x="-234">
          <e:Image id="background" scaleX="1" scaleY="1" x="0" y="0" width="1218" height="1624" source="loading_bg_png"/>
          <e:Image id="progressBarBg" source="loading_progressBg_png" verticalCenter="100" width="322" x="448" height="8"/>
          <e:Image id="progressBar" source="loading_progress_png" verticalCenter="100" width="322" x="448" height="8"/>
          <e:Label id="progressText" text="正在前往 0%" y="945.09" anchorOffsetX="0" anchorOffsetY="0" size="34" horizontalCenter="0" textColor="0xdf9438"/>
        </e:Group>
      </e:Group>
  </e:Skin>`;
}

