/**
 * 关联场景皮肤
 */
export var skinList: Object = {
  'LoadingSceneSkin': getLoadingSkin,
  'MainSceneSkin': getMainSceneSkin,
  'NpcViewSkin': getNpcView
}

function getMainSceneSkin(){
  return `<?xml version='1.0' encoding='utf-8'?>
  <e:Skin class="MainSceneSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:ns1="*">
    <e:Group id="viewContent" height="1624" width="750" y="0" x="0" touchEnabled="true" name="view">
      <e:Group id="bgContainer" width="1218" height="1624" y="0" touchEnabled="true" x="-234">
        <e:Image id="background" scaleX="1" scaleY="1" x="0" y="0" height="1625" width="1218" source="bg_jpg" touchEnabled="true"/>
      </e:Group>
			<e:Group id="uiContainer" width="1218" height="1624" y="0" x="-234" touchEnabled="true" scaleX="1" scaleY="1"/>
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


function getNpcView(){
  return `<?xml version="1.0" encoding="utf-8"?>
  <e:Skin class="NpcPopupSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" width="536">
    <e:Image id="titlePic" y="0" width="462" height="462" x="37" source=""/>
    <e:Image id="btnPic" source="button_long_bg_png" y="520" touchEnabled="true" name="closeNpc" width="304" height="76" x="116"/>
    <e:Label id="btnText" text="加入队伍" y="543" touchEnabled="true" name="closeNpc" bold="true" anchorOffsetX="0" width="123" height="30" x="207"/>
    <e:Image id="close" source="npc_popup_close_png" y="639" x="234" width="68" height="68" touchEnabled="true" name="closeNpc"/>
  </e:Skin>`;
}
