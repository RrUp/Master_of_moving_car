window.__require=function e(t,o,n){function a(c,r){if(!o[c]){if(!t[c]){var s=c.split("/");if(s=s[s.length-1],!t[s]){var l="function"==typeof __require&&__require;if(!r&&l)return l(s,!0);if(i)return i(s,!0);throw new Error("Cannot find module '"+c+"'")}}var g=o[c]={exports:{}};t[c][0].call(g.exports,function(e){return a(t[c][1][e]||e)},g,g.exports,e,t,o,n)}return o[c].exports}for(var i="function"==typeof __require&&__require,c=0;c<n.length;c++)a(n[c]);return a}({GameRankingList:[function(e,t,o){"use strict";cc._RF.push(t,"5ef0boUISBPcrg8NkCRJC5z","GameRankingList"),cc.Class({extends:cc.Component,properties:{rankingScrollView:cc.ScrollView,scrollViewContent:cc.Node,prefabRankItem:cc.Prefab,loadingLabel:cc.Node},start:function(){var e=this;this.removeChild(),this.CC_WECHATGAME=!0,this.CC_WECHATGAME?window.wx.onMessage(function(t){0==t.messageType?e.removeChild():1==t.messageType?e.fetchFriendData(t.MAIN_MENU_NUM):3==t.messageType?(console.log("****\u63d0\u4ea4\u5f97\u5206"),e.submitScore(t.MAIN_MENU_NUM,t.score),console.log("\u63a5\u6536\u4e3b\u57df\u53d1\u6765\u6d88\u606f\uff1a",t.MAIN_MENU_NUM,t.score)):4==t.messageType?e.gameOverRank(t.MAIN_MENU_NUM):5==t.messageType&&e.fetchGroupFriendData(t.MAIN_MENU_NUM,t.shareTicket)}):(this.fetchFriendData(1e3),cc.log("else this.fetchFriendData(1000);"))},fetchFriendData:function(e){var t=this;this.removeChild(),this.rankingScrollView.active=!0,this.CC_WECHATGAME&&wx.getUserInfo({openIdList:["selfOpenId"],success:function(o){t.loadingLabel.active=!1,console.log("success",o.data);var n=o.data[0];wx.getFriendCloudStorage({keyList:[e],success:function(e){console.log("wx.getFriendCloudStorage success",e);var o=e.data;o.sort(function(e,t){return 0==e.KVDataList.length&&0==t.KVDataList.length?0:0==e.KVDataList.length?1:0==t.KVDataList.length?-1:t.KVDataList[0].value-e.KVDataList[0].value});for(var a=0;a<o.length;a++){var i=o[a],c=cc.instantiate(t.prefabRankItem);if(c.getComponent("RankItem").init(a,i),t.scrollViewContent.addChild(c),o[a].avatarUrl==n.avatarUrl){var r=cc.instantiate(t.prefabRankItem);r.getComponent("RankItem").init(a,i),r.y=-354,t.node.addChild(r,1,"1000")}}o.length<=8&&(t.scrollViewContent.getComponent(cc.Layout).resizeMode=cc.Layout.ResizeMode.NONE)},fail:function(e){console.log("wx.getFriendCloudStorage fail",e),t.loadingLabel.getComponent(cc.Label).string="\u6570\u636e\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u68c0\u6d4b\u7f51\u7edc\uff0c\u8c22\u8c22\u3002"}})},fail:function(e){t.loadingLabel.getComponent(cc.Label).string="\u6570\u636e\u52a0\u8f7d\u5931\u8d25\uff0c\u8bf7\u68c0\u6d4b\u7f51\u7edc\uff0c\u8c22\u8c22\u3002"}})},submitScore:function(e,t){console.log("     submitScore  ",e,t),this.CC_WECHATGAME?window.wx.getUserCloudStorage({keyList:[e],success:function(o){console.log("getUserCloudStorage","success",o),0!=o.KVDataList.length&&o.KVDataList[0].value>t||window.wx.setUserCloudStorage({KVDataList:[{key:e,value:""+t}],success:function(e){console.log("setUserCloudStorage","success",e)},fail:function(e){console.log("setUserCloudStorage","fail")},complete:function(e){console.log("setUserCloudStorage","ok")}})},fail:function(e){console.log("getUserCloudStorage","fail")},complete:function(e){console.log("getUserCloudStorage","ok")}}):cc.log("\u63d0\u4ea4\u5f97\u5206:"+e+" : "+t)},removeChild:function(){console.log("____remove",this.node.getChildByName("1000")),null!=this.node.getChildByName("1000")&&this.node.removeChild(this.node.getChildByName("1000")),this.rankingScrollView.active=!1,this.scrollViewContent.removeAllChildren(),this.loadingLabel.getComponent(cc.Label).string="\u73a9\u547d\u52a0\u8f7d\u4e2d...",this.loadingLabel.active=!0}}),cc._RF.pop()},{}],Rankitem:[function(e,t,o){"use strict";cc._RF.push(t,"f5e13ZA9itJYZ0SztxeMDXm","Rankitem"),cc.Class({extends:cc.Component,name:"RankItem",properties:{backSprite:cc.Node,rankLabel:cc.Label,avatarImgSprite:cc.Sprite,nickLabel:cc.Label,topScoreLabel:cc.Label},start:function(){},init:function(e,t){var o=t.avatarUrl,n=t.nickname,a=0!=t.KVDataList.length?t.KVDataList[0].value:0;e%2==0&&(this.backSprite.color=new cc.Color(55,55,55,255)),0==e?(this.rankLabel.node.color=new cc.Color(255,0,0,255),this.rankLabel.node.setScale(2)):1==e?(this.rankLabel.node.color=new cc.Color(255,255,0,255),this.rankLabel.node.setScale(1.6)):2==e&&(this.rankLabel.node.color=new cc.Color(100,255,0,255),this.rankLabel.node.setScale(1.3)),this.rankLabel.node.string=(e+1).toString(),this.createImage(o),this.nickLabel.string=n,this.topScoreLabel.string=a.toString()},createImage:function(e){var t=this;cc.loader.load({url:e,type:"jpg"},function(e,o){t.avatarImgSprite.spriteFrame=new cc.SpriteFrame(o)})}}),cc._RF.pop()},{}]},{},["GameRankingList","Rankitem"]);